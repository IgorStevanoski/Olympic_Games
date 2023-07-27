import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LokacijaService {

  constructor(private http: HttpClient) { }

  uri='http://localhost:4000'

  dohvatiSveLokacije(){
    return this.http.get(`${this.uri}/lokacija/dohvatiSveLokacije`);
  }
}


