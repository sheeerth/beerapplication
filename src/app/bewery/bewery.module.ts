import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { BeweryComponent } from './grid/bewery/bewery.component';
import { DropdownComponent } from './grid/bewery/dropdown/dropdown.component';
import {BeerListComponent} from './grid/bewery/beer-list/beer-list.component';
import {BreweryService} from './services/bewery.service';

import {
  MatGridListModule,
  MatSelectModule,
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  MatListModule,
  MatPaginatorModule, MatIconModule, MatDialogModule, MatSlideToggleModule, MatInputModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {BeerDialogComponent} from './grid/bewery/beer-list/beer-dialog.component';
import {OptionsComponent} from './grid/options.component';
import {SettingsService} from './services/settings.service';

@NgModule({
  declarations: [GridComponent, BeweryComponent, DropdownComponent, BeerListComponent, BeerDialogComponent, OptionsComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatPaginatorModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatInputModule
  ],
  entryComponents: [BeerDialogComponent, OptionsComponent],
  exports: [GridComponent],
  providers: [BreweryService, SettingsService]
})
export class BeweryModule { }
