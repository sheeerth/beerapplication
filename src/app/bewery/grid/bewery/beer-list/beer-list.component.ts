import {Component, Input, OnInit} from '@angular/core';
import {Beer} from '../../../data/beer.data';
import {MatDialog} from '@angular/material';
import {BeerDialogComponent} from './beer-dialog.component';
import {SettingsService} from '../../../services/settings.service';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss']
})
export class BeerListComponent implements OnInit {
  @Input() beerList: [Beer[]];
  @Input() counter: number;
  @Input() beerFull: Beer[];

  beerIndexDisplay = 0;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog(beer: Beer): void {
    const dialogRef = this.dialog.open(BeerDialogComponent, {
      width: '400px',
      data: {name: beer.name, picture: beer.picture, price: beer.price, type: beer.type}
    });
  }

  returnIndexTab(event) {
    this.beerIndexDisplay = event.pageIndex;
  }
}

