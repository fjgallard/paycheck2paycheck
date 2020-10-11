import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Budget } from '@services/storage/budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
})
export class BudgetComponent implements OnInit {

  id: string;
  budget: Budget;

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
  }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss({
      id: this.id,
      budget: this.budget
    });
  }

  setIcon(icon: string) {
    // this.categoryForm.get('icon').setValue(icon);
    // this.deselectIcons();
    this.iconList[icon] = true;
  }

}
