import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Buffer } from 'buffer';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmailService {
  apiUrl(endpoint: string) {
    return `http://127.0.0.1:3000/api/v1/${endpoint}`
  }

  constructor(private http: Http) { }

  fetchEmail(pageToken?: string) {
    return this.http.post(this.apiUrl('email/get'), pageToken ? {
      pageToken
    } : {} , {
      withCredentials: true
    }).map(response => response.json())
    // .catch(error => Observable.throw(error))
  }

  decodeEmail(encodedEmail: string) {
    return (new Buffer(encodedEmail, 'base64')).toString();
  }

  sendEmail(emailAddress: string, subject: string, body: string) {
    return this.http.post(this.apiUrl('email/send'), {
      receiverEmail: emailAddress,
      mailSubject: subject,
      mailBody: body
    } , {
      withCredentials: true
    }).map(response => response.json());
  }
}
