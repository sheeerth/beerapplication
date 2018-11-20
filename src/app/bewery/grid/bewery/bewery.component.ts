import {Component, Input, OnInit} from '@angular/core';
import {Brewery} from '../../data/brewery.data';
import {Beer} from '../../data/beer.data';

@Component({
  selector: 'app-bewery',
  templateUrl: './bewery.component.html',
  styleUrls: ['./bewery.component.scss']
})
export class BeweryComponent implements OnInit {
  @Input() breweryList: Brewery[];
  @Input() beerList: [Beer[]];
  @Input() counter: number;
  @Input() beerFull: Beer[];
  @Input() breweryDefault: Brewery;

  constructor() { }

  ngOnInit() {
  }

}
