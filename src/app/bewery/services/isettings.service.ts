import {Sort} from '../data/sort.enum';

export interface ISettings {
  darkMode: boolean;
  sortBeer: Sort;
  counter: number;

  setCounter(value): void;

  setMode(value): void;

  setSortType(value): void;

  loadLocalStorage(): { darkMode: boolean, sortBeer: string, counter: number } ;

  downloadOrSettingVar(): void;
}
