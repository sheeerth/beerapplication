import {Brewery} from '../data/brewery.data';
import {BeerComponent} from '../data/beerComponent.data';
import {Beer} from '../data/beer.data';
import {Sort} from '../data/sort.enum';

export interface IBrewery {
  breweryList: Brewery[];
  beerList: BeerComponent[];

  createBreweryListLocal(callback: Function, value: Brewery[]): void;

  createBreweryList(callback: Function): void;

  getBreweryBeer(id: string, selectId: string): any;

  createPaginatorBeerList(beers, counter): Array<Beer[]>;

  sortingBeerList(value: Sort, beerList: Beer[]): Beer[];

  getLocalStorageBreweryList():  Brewery[] ;

  saveLocalStorageBreweryList(breweryList): void;

  getLocalStorageBrewery(): ({ id: string; beers: Beer[][]; beerFull: Beer[]; brewery: Brewery })[];

  saveLocalStorage(columns): void;
}
