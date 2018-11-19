import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSlideToggleChange} from '@angular/material';
import {DialogData} from './grid.component';
import {SettingsService} from '../services/settings.service';
import {Sort} from '../data/sort.enum';

@Component({
  selector: 'app-options',
  templateUrl: 'options.component.html',
})
export class OptionsComponent {
  counter: number;
  darkMode: boolean;
  sortBeer: Sort;
  sortType = [Sort.name, Sort.price, Sort.type];

  constructor(
    public dialogRef: MatDialogRef<OptionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private settingsService: SettingsService) {
      this.counter = this.settingsService.counter;
      this.darkMode = this.settingsService.darkMode;
      this.sortBeer = this.settingsService.sortBeer;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectedChange(event) {
    this.settingsService.setSortType(event.value);
  }

  counterChange(event) {
    this.settingsService.setCounter(event.target.value);
  }

  modeChange(event: MatSlideToggleChange) {
    this.settingsService.setMode(event.checked);
  }

}
