import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EkipaService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  dohvatiSveEkipe() {
    return this.http.get(`${this.uri}/ekipa/dohvatiSveEkipe`);
  }

  dohvatiEkipePoKriterijumu(zemlja, sport, disciplina, pol) {
    const podaci = {
      zemlja : zemlja,
      sport: sport,
      disciplina: disciplina,
      pol: pol
    }
    return this.http.post(`${this.uri}/ekipa/dohvatiEkipePoKriterijumu`, podaci);
  }

  unesiEkipu(zemlja, sport, disciplina, pol, sportisti) {
    const podaci = {
      zemlja : zemlja,
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      sportisti: sportisti
    }
    return this.http.post(`${this.uri}/ekipa/unesiEkipu`, podaci);
  }
  
}


