import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZemljaService {

  constructor(private http: HttpClient) { }

  uri='http://localhost:4000'

  dohvatiSveZemlje(){
    return this.http.get(`${this.uri}/zemlja/dohvatiSveZemlje`);
  }

}
