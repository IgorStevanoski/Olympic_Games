import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient) { }

  uri='http://localhost:4000'

  prijavaNaSistem(kor_ime, lozinka){
    const podaci={
      kor_ime: kor_ime,
      lozinka: lozinka
    }

    return this.http.post(`${this.uri}/korisnik/prijavaNaSistem`, podaci);
  }

  registruj(kor_ime, lozinka, ime, prezime, nacionalnost, mejl, tip, broj_takmicenja){
    const podaci={
      kor_ime: kor_ime,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      nacionalnost: nacionalnost,
      mejl: mejl,
      tip: tip,
      broj_takmicenja: broj_takmicenja
    }

    return this.http.post(`${this.uri}/korisnik/registruj`, podaci);
  }

  promeniSifru(kor_ime, lozinka, lozinkaNova){
    const podaci={
      kor_ime: kor_ime,
      lozinka: lozinka,
      lozinkaNova: lozinkaNova,
    }

    return this.http.post(`${this.uri}/korisnik/promeniSifru`, podaci);
  }

  dohvatiDelegate(){
    return this.http.get(`${this.uri}/korisnik/dohvatiDelegate`);
  }

  dohvatiVodje(){
    return this.http.get(`${this.uri}/korisnik/dohvatiVodje`);
  }
 
  dohvatiZahteve(){
    return this.http.get(`${this.uri}/korisnik/dohvatiZahteve`);
  }

  odobriZahtev(kor_ime, lozinka, ime, prezime, nacionalnost, mejl, tip, broj_takmicenja){
    const podaci={
      kor_ime: kor_ime,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      nacionalnost: nacionalnost,
      mejl: mejl,
      tip: tip,
      broj_takmicenja: broj_takmicenja
    }

    return this.http.post(`${this.uri}/korisnik/odobriZahtev`, podaci);
  }

  odbaciZahtev(kor_ime){
    const podaci={
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/korisnik/odbaciZahtev`, podaci);
  }

  azurirajBrojTakmicenjaDelegata(ime, prezime){
    const podaci={
      ime: ime, 
      prezime: prezime
    }

    return this.http.post(`${this.uri}/korisnik/azurirajBrojTakmicenjaDelegata`, podaci);
  }

  /*dohvatiKorisnika(kor_ime){
    const podaci={
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/korisnici/dohvatiKorisnika`, podaci);
  }*/

}
