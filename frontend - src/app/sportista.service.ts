import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportistaService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  dohvatiSportistePoKriterijumu(ime, prezime, zemlja, sport, disciplina, medalja, pol) {
    const podaci = {
      ime: ime,
      prezime: prezime,
      zemlja: zemlja,
      sport: sport,
      disciplina: disciplina,
      medalja: medalja,
      pol: pol
    }

    return this.http.post(`${this.uri}/sportista/dohvatiSportistePoKriterijumu`, podaci);
  }

  dohvatiBrojSportistaZemlje(zemlja) {
    const podaci = {
      zemlja: zemlja,
    }
    return this.http.post(`${this.uri}/sportista/dohvatiBrojSportistaZemlje`, podaci);
  }

  dohvatiBrojRazlicitihSportistaZemlje(zemlja) {
    const podaci = {
      zemlja: zemlja,
    }
    return this.http.post(`${this.uri}/sportista/dohvatiBrojRazlicitihSportistaZemlje`, podaci);
  }

  dohvatiBrojRazlicitihSportistaPoKriterijumu(zemlja, sport, disciplina) {
    const podaci = {
      zemlja: zemlja,
      sport: sport,
      disciplina: disciplina,
    }
    return this.http.post(`${this.uri}/sportista/dohvatiBrojRazlicitihSportistaPoKriterijumu`, podaci);
  }

  proveriSportistu(ime, prezime) {
    const podaci = {
      ime: ime,
      prezime: prezime
    }
    return this.http.post(`${this.uri}/sportista/proveriSportistu`, podaci);
  }

  prijaviSportistu(ime, prezime, zemlja, sport, disciplina, medalja, pol) {
    const podaci = {
      ime: ime,
      prezime: prezime,
      zemlja: zemlja,
      sport: sport,
      disciplina: disciplina,
      medalja: medalja,
      pol: pol
    }
    return this.http.post(`${this.uri}/sportista/prijaviSportistu`, podaci);
  }

}