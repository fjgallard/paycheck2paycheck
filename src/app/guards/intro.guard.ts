import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(private storage: Storage, private router: Router) { }

  async canActivate(): Promise<boolean> {
      let tutorialSeen = await this.storage.get('tutorialSeen');

      if (!tutorialSeen) {
        this.router.navigateByUrl('/intro');
      }

      return tutorialSeen;
  }

}
