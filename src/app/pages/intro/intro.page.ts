import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }                       from '@angular/router';

import { IonSlides } from '@ionic/angular';
import { Storage }   from '@ionic/storage';
import { BudgetService } from '@services/storage/budget/budget.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  id: string;
  limit: number;
  duration: 'month' | 'year' | 'week';
  icon: string;

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

  constructor(private storage: Storage, private router: Router, private budgetService: BudgetService) {
    this.iconListKeys = Object.keys(this.iconList);
    this.duration = this.duration || 'month';
    this.icon = this.icon || 'airplane';
    this.iconList[this.icon] = true;
  }

  async ngOnInit() {
  }

  next() {
    this.slides.slideNext();
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

  async finish() {
    await Promise.all([
      this.budgetService.createBudget({
        id: this.id,
        limit: this.limit,
        icon: this.icon,
        duration: this.duration,
        createdAt: new Date()
      }),
      this.storage.set('tutorialSeen', true)
    ]);

    this.router.navigateByUrl('/');
  }

}
