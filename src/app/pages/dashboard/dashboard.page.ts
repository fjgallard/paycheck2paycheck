import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  monthlyIncome: number;
  constructor(private storage: Storage) { }

  async ngOnInit() {
    this.monthlyIncome = await this.storage.get('monthlyIncome');
  }

}
