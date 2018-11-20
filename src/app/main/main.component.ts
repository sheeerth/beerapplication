import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../bewery/services/settings.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  darkMode: boolean;

  constructor(private settingService: SettingsService) { }

  ngOnInit() {
    this.darkMode = this.settingService.darkMode;
    this.settingService.modeUpdate.subscribe(value => this.darkMode = value);
  }

}
