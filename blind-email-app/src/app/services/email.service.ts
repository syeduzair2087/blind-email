import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Buffer } from 'buffer';

@Injectable()
export class EmailService {
  apiUrl(endpoint: string) {
    return `https://www.blind-email.herokuapp.com/api/v1/${endpoint}`
  }

  constructor(private http: Http) { }

  fetchEmail() {
    return this.http.post(this.apiUrl('email/get'), {}, {
      withCredentials: true
    }).map(response => response.json());
  }

  decodeEmail(encodedEmail: string) {
    return (new Buffer(encodedEmail, 'base64')).toString();
  }
}
