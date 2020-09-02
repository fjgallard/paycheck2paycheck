import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  monthlyIncome: number;

  constructor(private storage: Storage) { }

  async ngOnInit() {
    this.monthlyIncome = await this.storage.get('monthlyIncome');
  }

  submit() {
    if (this.monthlyIncome) {
      this.storage.set('monthlyIncome', this.monthlyIncome);
    }

  }

}
