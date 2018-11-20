import {EventEmitter, Injectable, Output} from '@angular/core';
import {Sort} from '../data/sort.enum';
import {ISettings} from './isettings.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements ISettings {
  private _darkMode: boolean;
  private _sortBeer: Sort;
  private _counter: number;

  @Output() counterUpdate: EventEmitter<number> = new EventEmitter();

  @Output() modeUpdate: EventEmitter<boolean> = new EventEmitter();

  @Output() sortUpdate: EventEmitter<Sort> = new EventEmitter();

  get darkMode(): boolean {
    return this._darkMode;
  }

  set darkMode(value) {
    this._darkMode = value;
  }

  get sortBeer(): Sort {
    return this._sortBeer;
  }

  set sortBeer(value) {
    this._sortBeer = value;
  }

  get counter(): number {
    return this._counter;
  }

  set counter(value) {
    this._counter = value;
  }

  constructor() {
    this.downloadOrSettingVar();
  }

  setCounter(value): void {
    this._counter = value;
    localStorage.setItem('counter', value);
    this.counterUpdate.emit(value);
  }

  setMode(value): void {
    this._darkMode = value;
    localStorage.setItem('darkMode', value);
    this.modeUpdate.emit(value);
  }

  setSortType(value): void {
    this._sortBeer = value;
    localStorage.setItem('sortBeer', value);
    this.sortUpdate.emit(value);
  }

  loadLocalStorage(): { darkMode: boolean, sortBeer: string, counter: number }  {
    const darkMode: boolean =  localStorage.getItem('darkMode') === 'true';
    const sortBeer: string =  localStorage.getItem('sortBeer');
    const counter: number =  Number(localStorage.getItem('counter'));

    return {
      darkMode: !darkMode ? false : darkMode,
      sortBeer: !sortBeer ? Sort.name : sortBeer,
      counter: !counter ? 15 : Number(counter)
    };
  }

  downloadOrSettingVar(): void {
    const localSettings = this.loadLocalStorage();
    this._counter = localSettings.counter;
    this._darkMode = localSettings.darkMode;
    this._sortBeer = localSettings.sortBeer === 'Name' ? Sort.name :
      localSettings.sortBeer === 'Type' ? Sort.type :
      localSettings.sortBeer === 'Price' ? Sort.price : null;
  }
}
