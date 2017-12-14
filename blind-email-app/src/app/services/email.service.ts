import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Buffer } from 'buffer';

@Injectable()
export class EmailService {
  apiUrl(endpoint: string) {
    return `https://blind-email.herokuapp.com/api/v1/${endpoint}`
  }

  constructor(private http: Http) { }

  fetchEmail(pageToken?: string) {
    return this.http.post(this.apiUrl('email/get'), pageToken ? {
      pageToken
    } : {} , {
      withCredentials: true
    }).map(response => response.json());
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
