import {Component, Input, OnInit} from '@angular/core';
import {Brewery} from '../../../data/brewery.data';
import {MatSelectChange} from '@angular/material';
import {BreweryService} from '../../../services/bewery.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  constructor(private breweryService: BreweryService) { }
  @Input() breweryList: Brewery[];
  @Input() breweryDefault: Brewery;

  ngOnInit() {
  }

  selectBreweryChange(change: MatSelectChange) {
    this.breweryService.getBreweryBeer(change.value, change.source.id);
  }
}
