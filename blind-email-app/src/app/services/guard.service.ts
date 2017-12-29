import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Injectable()
export class HomeGuard implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router) { }

  canActivate() {
    if (this.cookieService.get('token'))
      return true;
    this.router.navigate(['login'])
    return false;

  }
}

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router) { }

  canActivate() {
    if (!this.cookieService.get('token'))
      return true;
    this.router.navigate(['home']);
    return false;
  }

}
