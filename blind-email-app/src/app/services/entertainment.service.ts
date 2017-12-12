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

}
