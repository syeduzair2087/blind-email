import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  apiUrl(endpoint: string) {
    return `http://127.0.0.1:3000/api/v1/${endpoint}`
  }

  constructor(private http: Http) { }

  login() {
    return this.http.get(this.apiUrl('email/login'))
      .map(response => response.json())
  }

  logout() {
    return this.http.get(this.apiUrl('email/logout'))
      .map(response => response.json())
  }
}
