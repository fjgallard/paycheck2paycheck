import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
})
export class BudgetComponent implements OnInit {

  @Input() id: string;
  @Input() limit: number;
  @Input() duration: string;
  @Input() icon: string;

  iconList = {
    airplane: false,
    home: false,
    pizza: false,
    card: false,
    bus: false,
    basket: false,
    bulb: false,
    call: false
  };

  iconListKeys = [];

  constructor(private modalCtrl: ModalController) {
    this.iconListKeys = Object.keys(this.iconList);
    this.duration = this.duration || 'month';
    this.icon = this.icon || 'airplane';
    this.iconList[this.icon] = true;
  }

  ngOnInit() {}

  async save() {
    await this.modalCtrl.dismiss({
      budget: {
        id: this.id,
        limit: this.limit,
        icon: this.icon,
        duration: this.duration,
        createdAt: new Date()
      }
    });
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  setIcon(icon: string) {
    this.icon = icon;
    this.deselectIcons();
    this.iconList[icon] = true;
  }

  private deselectIcons() {
    this.iconListKeys.forEach(key => {
      this.iconList[key] = false;
    });
  }

}
