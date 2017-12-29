import { Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EntertainmentService {
  apiUrl(endpoint: string) {
    return `http://127.0.0.1:3000/api/v1/${endpoint}`
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
        title = 'we dont talk anymore';
        break;
      case 3:
        title = "We Don't Run";
        break;
      case 4:
        title = 'love me like you do';
        break;
      case 5:
        title = 'Born Again Tomorrow';
        break;
      case 6:
        title = 'animals';
        break;
      case 7:
        title = 'Dil Diyan Gallan';
        break;
    }

    let params = new URLSearchParams();
    params.append('songName', title);

    return this.apiUrl('entertainment/getSong?songName=' + title);

    // return this.http.get(this.apiUrl('entertainment/getSong'), { params })
    // .map(response => response.json())
  }

  fetchSongsList() {
    return [
      'Man Amadeam',
      'we dont talk anymore',
      "We Don't Run",
      'love me like you do',
      'Born Again Tomorrow',
      'animals',
      'Dil Diyan Gallan'

    ]
  }

}
