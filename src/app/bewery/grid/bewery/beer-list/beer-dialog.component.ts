import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Beer} from '../../../data/beer.data';

@Component({
  selector: 'app-beer-dialog',
  templateUrl: 'beer-dialog.html',
})
export class BeerDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<BeerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Beer) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
