import {EventEmitter, Injectable, Output} from '@angular/core';
import {IBrewery} from './ibewery.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Brewery} from '../data/brewery.data';
import {ResponseDB} from '../data/response.data';
import {map} from 'rxjs/operators';
import {Beer} from '../data/beer.data';
import {BeerComponent} from '../data/beerComponent.data';
import {Sort} from '../data/sort.enum';

interface EventType {
  beerComponents: BeerComponent[];
  beerComponent: BeerComponent;
}

@Injectable()
export class BreweryService implements IBrewery {
  @Output() beerIsUpload: EventEmitter<EventType> = new EventEmitter();
  private readonly _breweryList: Brewery[];

  private readonly _beerList: BeerComponent[];

  get breweryList(): Brewery[] {
    return this._breweryList;
  }

  get beerList(): BeerComponent[] {
    return this._beerList;
  }

  constructor(private _http: HttpClient) {
    this._breweryList = [];
    this._beerList = [];
  }

  private getRandomBrewery(): Observable<ResponseDB> {
      return this._http.get<ResponseDB>(environment.beerUrl + '/brewery');
  }

  private MappingBeer (beerArray: any, id: string, selectId: string): BeerComponent {
    const beers: Beer[] = beerArray.map(beer => ({
        id: beer.id,
        name: !beer.name ? '' : beer.name,
        nameDisplay: !beer.nameDisplay ? '' : beer.nameDisplay ,
        type: !beer.style ? '' : beer.style.name,
        picture: 'assets/beer.jpg',
        price: Math.random() * 100
      })
    );
    const brewery: Brewery = this.SearchBreweryById(id);
    return {
      selectId,
      brewery,
      beers
    };
  }

  private checkBeerList(beer: BeerComponent): void {
    if (!this._beerList.find(element => element.selectId === beer.selectId)) {
      this._beerList.push(beer);
    } else {
      const element = this._beerList.findIndex(value => value.selectId === beer.selectId);
      this._beerList[element] = beer;
    }
  }

  private SearchBreweryById(id: string): Brewery {
    return this._breweryList.find(brewery => brewery.id === id);
  }

  private sortingHelper(a, b) {
    return a - b;
  }

  createBreweryList(callback: Function): void {
    for (let i = 0; i < 15; i++) {
      this.getRandomBrewery()
      .pipe(map(value => value.data), map(({id, nameShortDisplay, name}) => ({id: id, name: name, nameShortDisplay: nameShortDisplay})))
      .subscribe((value: Brewery) => {
        this._breweryList.push(value);
        callback(value);
        this.saveLocalStorageBreweryList(this.breweryList);
      }) ;
    }
  }

  createBreweryListLocal(callback: Function, value: Brewery[]): void {
      value.forEach(brewery => {
        this._breweryList.push(brewery);
        callback(brewery);
      });
  }

  getBreweryBeer(id: string, selectId: string): void {
    this._http.get<ResponseDB>(environment.beerUrl + '/beer?id=' + id)
      .pipe(map(value => value.data))
      .subscribe(value => {
        const element = this.MappingBeer(value, id, selectId);
        this.checkBeerList(element);
        this.beerIsUpload.emit({beerComponents: this._beerList, beerComponent: element});
      });
  }

  createPaginatorBeerList(beers, counter): Beer[][]  {
    let start = 0;
    let end = Number(counter);
    const newBeerList: Beer[][] = [];
    for (let i = 0; i < Math.ceil(beers.length / counter); i++) {
      newBeerList.push(beers.slice(start, end));
      start += Number(counter);
      end += Number(counter);
    }
    return newBeerList;
  }

  saveLocalStorage(columns): void {
      localStorage.setItem('column', JSON.stringify(columns));
  }

  getLocalStorageBrewery(): ({ id: string; beers: Beer[][]; beerFull: Beer[]; brewery: Brewery })[] {
    return JSON.parse(localStorage.getItem('column'));
  }

  saveLocalStorageBreweryList(breweryList): void {
    localStorage.setItem('breweryList', JSON.stringify(breweryList));
  }

  getLocalStorageBreweryList(): Brewery[] {
    return JSON.parse(localStorage.getItem('breweryList'));
  }

  sortingBeerList(value: Sort, beerList: Beer[]): Beer[] {
    switch (value) {
      case Sort.name:
        beerList.sort(function (a, b) {
          return a.name.toUpperCase().charCodeAt(0) - b.name.toUpperCase().charCodeAt(0);
        });
        break;
      case Sort.type:
        beerList.sort(function (a, b) {
          return a.type.toUpperCase().charCodeAt(0) - b.name.toUpperCase().charCodeAt(0);
        });
        break;
      case Sort.price:
        beerList.sort((a, b) => this.sortingHelper(a.price, b.price));
        break;
    }
    return beerList;
  }

}
