import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  constructor(private http: HttpClient) { }

  uri='http://localhost:4000'

  dohvatiSveSportove(){
    return this.http.get(`${this.uri}/sport/dohvatiSveSportove`);
  }

  dohvatiSveUneteSportove(){
    return this.http.get(`${this.uri}/unetSport/dohvatiSveUneteSportove`);
  }

  unesiSport(ime){
    const podaci={
      ime: ime,
    }
    return this.http.post(`${this.uri}/unetSport/unesiSport`, podaci);
  }

  unesiDisciplinu(ime, disciplina, min, max, tip){
    const podaci={
      ime: ime,
      disciplina: disciplina,
      min : min, 
      max : max,
      tip : tip
    }
    return this.http.post(`${this.uri}/unetSport/unesiDisciplinu`, podaci);
  }


}
