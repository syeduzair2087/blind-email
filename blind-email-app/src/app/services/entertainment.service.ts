import { Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EntertainmentService {
  apiUrl(endpoint: string) {
    return `https://blind-email.herokuapp.com/api/v1/${endpoint}`
  }

  constructor(private http: Http) { }

  fetchPdf(index: number) {
    let title: string;

    switch (index) {
      case 1:
        title = 'pdf_sample';
        break;
      case 2:
        title = 'quarterly_magazine_sample';
        break;
      case 3:
        title = 'Test_Plan';
        break;
      case 4:
        title = 'pdf_sample';
        break;
      case 5:
        title = 'pdf_sample';
        break;
    }

    let params = new URLSearchParams();
    params.append('fileName', title);

    return this.http.get(this.apiUrl('entertainment/getPdfText'), { params })
      .map(response => response.json())
  }

  fetchSongUrl(index: number) {
    let title: string;

    switch (index) {
      case 1:
        title = 'ManAamadeh';
        break;
      case 2:
        title = 'ManAamadeh';
        break;
      case 3:
        title = 'ManAamadeh';
        break;
      case 4:
        title = 'ManAamadeh';
        break;
      case 5:
        title = 'ManAamadeh';
        break;
    }

    let params = new URLSearchParams();
    params.append('songName', title);

    return this.apiUrl('entertainment/getSong?songName=' + title);

    // return this.http.get(this.apiUrl('entertainment/getSong'), { params })
      // .map(response => response.json())
  }

}
