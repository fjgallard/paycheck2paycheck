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

  @ViewChild(IonSlides) slides: IonSlides;

  constructor(private storage: Storage, private router: Router) { }

  ngOnInit() {
  }

  next() {
    this.slides.slideNext();
  }

  async finish() {
    await this.storage.set('tutorialSeen', true);
    this.router.navigateByUrl('/login');
  }

}
