import {Beer} from './beer.data';
import {Brewery} from './brewery.data';

export interface BeerComponent {
  selectId: string;
  brewery: Brewery;
  beers: Beer[];
}
