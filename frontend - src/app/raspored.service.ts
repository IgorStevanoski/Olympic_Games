import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RasporedService {

  constructor(private http: HttpClient) { }

  uri='http://localhost:4000'

  dohvatiSveRasporede(){
    return this.http.get(`${this.uri}/raspored/dohvatiSveRasporede`);
  }
  
  unesiRasporedZaTakmicenje(takmicenje, desavanje){
    const podaci={
      takmicenje: takmicenje,
      desavanje: desavanje
    }

    return this.http.post(`${this.uri}/raspored/unesiRasporedZaTakmicenje`, podaci);
  }

  unesiDesavanjeURaspored(vremePocetka, lokacija, ucesnici, rezultat, 
    brojKrugova, status, sport, disciplina, pol){
    const podaci={
      vremePocetka: vremePocetka,
      lokacija: lokacija,
      ucesnici: ucesnici,
      rezultat: rezultat,
      brojKrugova: brojKrugova,
      status: status,
      sport: sport,
      disciplina: disciplina,
      pol: pol
    }

    return this.http.post(`${this.uri}/raspored/unesiDesavanjeURaspored`, podaci);
  }

  unesiVreme(vreme, sport, disciplina, pol){
    const podaci={
      vreme: vreme,
      sport: sport,
      disciplina : disciplina,
      pol : pol
    }

    return this.http.post(`${this.uri}/raspored/unesiVreme`, podaci);
  }

  unesiRezultate(desavanje, sport, disciplina, pol){
    const podaci={
      desavanje: desavanje,
      sport: sport,
      disciplina : disciplina,
      pol : pol
    }

    return this.http.post(`${this.uri}/raspored/unesiRezultate`, podaci);
  }
}
