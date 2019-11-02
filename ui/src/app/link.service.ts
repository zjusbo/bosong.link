import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EDIT_API } from './consts';

interface Form {
	short_url: string,
	original_url: string,
}

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

  edit(shortUrl: string, originalUrl: string) {
  	const formData = new FormData();
  	formData.append('short_url', shortUrl);
  	formData.append('original_url', originalUrl);

    return this.http.post(EDIT_API, formData);
  }
}