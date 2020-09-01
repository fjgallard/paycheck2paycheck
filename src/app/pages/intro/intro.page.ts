import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  private readonly DEFAULT_INCOME = 1000;

  @ViewChild(IonSlides) slides: IonSlides;

  income: number;

  constructor(private storage: Storage, private router: Router) { }

  async ngOnInit() {
    console.log(await this.storage.get('income'));
    console.log(await this.storage.get('tutorialSeen'));
  }

  next() {
    this.slides.slideNext();
  }

  async finish() {
    if (!this.income) {
      this.income = this.DEFAULT_INCOME;
    }

    await Promise.all([
      this.storage.set('income', this.income),
      this.storage.set('tutorialSeen', true)
    ]);
    this.router.navigateByUrl('/');
  }

}
