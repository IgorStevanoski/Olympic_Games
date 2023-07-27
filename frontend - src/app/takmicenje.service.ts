import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TakmicenjeService {

  constructor(private http: HttpClient) { }

  uri='http://localhost:4000'

  unesiTakmicenje(sport, disciplina, pol, datumPocetka, lokacija, tip, delegat, format, status){
    const podaci={
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      datumPocetka: datumPocetka,
      lokacija: lokacija,
      tip: tip,
      delegat: delegat,
      format: format,
      status: status
    }
    return this.http.post(`${this.uri}/takmicenje/unesiTakmicenje`, podaci);
  }
  
  dohvatiSvaTakmicenja(status){
    const podaci={
      status: status
    }

    return this.http.post(`${this.uri}/takmicenje/dohvatiSvaTakmicenja`, podaci);
  }
 
  unesiSportistuUTakmicenje(sport, disciplina, pol, ime, prezime){
    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      ime: ime, 
      prezime: prezime
    }    
    return this.http.post(`${this.uri}/takmicenje/unesiSportistuUTakmicenje`, podaci);
  }
 
  unesiEkipuUTakmicenje(sport, disciplina, pol, zemlja){
    const podaci = {
      sport : sport,
      disciplina : disciplina,
      pol : pol,
      zemlja : zemlja    
    }    
    return this.http.post(`${this.uri}/takmicenje/unesiEkipuUTakmicenje`, podaci);
  }

  unesiDelegataUTakmicenje(sport, disciplina, pol, ime, prezime){
    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      ime: ime, 
      prezime: prezime
    }    
    return this.http.post(`${this.uri}/takmicenje/unesiDelegataUTakmicenje`, podaci);
  }

  zapocniTakmicenje(sport, disciplina, pol){
    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol
    }    
    return this.http.post(`${this.uri}/takmicenje/zapocniTakmicenje`, podaci);
  }

  

}