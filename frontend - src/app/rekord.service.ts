import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RekordService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  dohvatiSveRekorde() {
    return this.http.get(`${this.uri}/rekord/dohvatiSveRekorde`);
  }
}


