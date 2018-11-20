import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreweryService} from '../services/bewery.service';
import {Brewery} from '../data/brewery.data';
import {BeerComponent} from '../data/beerComponent.data';
import {MatDialog} from '@angular/material';
import {OptionsComponent} from './options.component';
import {SettingsService} from '../services/settings.service';
import {Beer} from '../data/beer.data';
import {Sort} from '../data/sort.enum';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  breweryList: Brewery[];
  beerList: BeerComponent[];
  columns: ({ id: string; beers: Beer[][]; beerFull: Beer[]; brewery: Brewery })[] = [
    {
      id: 'mat-select-0',
      beers: [],
      beerFull: [],
      brewery: null
    },
    {
      id: 'mat-select-1',
      beers: [],
      beerFull: [],
      brewery: null
    },
    {
      id: 'mat-select-2',
      beers: [],
      beerFull: [],
      brewery: null
    }];
  counter: number;
  sortBeer: Sort;

  constructor(private breweryService: BreweryService, public dialog: MatDialog, private settingService: SettingsService) { }

  private updateColumnBeer(beerComponent: BeerComponent): void {
    const index = this.columns.findIndex(column => column.id === beerComponent.selectId);
    this.columns[index].beers = this.breweryService.createPaginatorBeerList(
      this.breweryService.sortingBeerList(this.sortBeer, beerComponent.beers),
      this.counter
    );
    this.columns[index].beerFull = beerComponent.beers;
    this.columns[index].brewery = beerComponent.brewery;
    this.breweryService.saveLocalStorage(this.columns);
  }

  ngOnInit() {
    this.breweryList = [];
    this.beerList = [];
    this.counter = this.settingService.counter;
    const breweryLocal: Brewery[] = this.breweryService.getLocalStorageBreweryList();
    if (!breweryLocal) {
      this.breweryService.createBreweryList((value) => this.breweryList.push(value));
    } else {
      this.breweryService.createBreweryListLocal((value) => this.breweryList.push(value), breweryLocal);
    }
    const columnLocal: ({ id: string; beers: Beer[][]; beerFull: Beer[]; brewery: Brewery })[] = this.breweryService.getLocalStorageBrewery();
    if (columnLocal) {
      this.columns = columnLocal;
    }

    this.listeningEvent();
  }

  listeningEvent() {
    this.breweryService.beerIsUpload
      .subscribe((value) => {
        this.beerList = value.beerComponents;
        this.updateColumnBeer(value.beerComponent);
      });
    this.settingService.counterUpdate
      .subscribe(value => {
        this.counter = value;
        this.columns.forEach(column => column.beers = this.breweryService.createPaginatorBeerList(column.beerFull, this.counter));
      });
    this.settingService.sortUpdate
      .subscribe(value => {
        this.sortBeer = value;
        this.columns.forEach(column => {
          const copyBeerComponent: BeerComponent = {
            selectId: column.id,
            brewery: column.brewery,
            beers: column.beerFull
          };
          this.updateColumnBeer(copyBeerComponent);
        });
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OptionsComponent, {
      width: '400px',
      data: {}
    });
  }
}

