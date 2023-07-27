import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EkipaService } from '../ekipa.service';
import { KorisnikService } from '../korisnik.service';
import { Ekipa } from '../model/ekipa';
import { Korisnik } from '../model/korisnik';
import { Sportista } from '../model/sportista';
import { Takmicar } from '../model/takmicar';
import { Takmicenje } from '../model/takmicenje';
import { SportistaService } from '../sportista.service';
import { TakmicenjeService } from '../takmicenje.service';

@Component({
  selector: 'app-takmicenje-dopuna',
  templateUrl: './takmicenje-dopuna.component.html',
  styleUrls: ['./takmicenje-dopuna.component.css']
})
export class TakmicenjeDopunaComponent implements OnInit {

  constructor(private takmicenjeServis: TakmicenjeService,
    private sportistaServis: SportistaService,
    private korisnikServis: KorisnikService,
    private ekipaServis: EkipaService,
    private ruter: Router) {
    this.dohvatiSvaTakmicenja();
    this.dohvatiDelegate();
    this.jeEkipni = false;
    this.jeMuski = false;
    this.takmicenje = "";
    this.sportista = "";
    this.ekipa = "";
    this.delegat = "";
    this.delegatPostojeci = "";
    this.greska = "";
    this.takmicari = [];
    let korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    if (!korisnik) this.ruter.navigate(['welcome']);
    else if (korisnik.tip != "organizator"){
      this.ruter.navigate(['welcome']);
    }
  }

  ngOnInit(): void {
  }

  takmicenje: string;
  takmicenja: Takmicenje[];
  sportista: string;
  sportisti: Sportista[];
  delegat: string;
  delegatPostojeci: string;
  delegati: Korisnik[];
  ekipa: string;
  ekipe: Ekipa[];
  jeEkipni: boolean;
  jeMuski: boolean;
  greska: string;
  takmicari: Takmicar[];

  dohvatiSvaTakmicenja() {
    this.takmicenjeServis.dohvatiSvaTakmicenja('formirano').subscribe((data: Takmicenje[]) => {
      this.takmicenja = data;
    })
  }

  dohvatiSportiste() {
    let sport;
    let disciplina;
    let pol = "";
    sport = this.takmicenje.split(" -")[0];
    disciplina = this.takmicenje.split(" -")[1];
    if (this.jeMuski == true) pol = "muski";
    else pol = "zenski";
    this.sportistaServis.dohvatiSportistePoKriterijumu("", "", "", sport, disciplina, false, pol).subscribe((data: Sportista[]) => {
      this.sportisti = data;
    })
  }

  dohvatiEkipe() {
    let sport;
    let disciplina;
    let pol = "";
    sport = this.takmicenje.split(" -")[0];
    disciplina = this.takmicenje.split(" -")[1];
    if (this.jeMuski == true) pol = "muski";
    else pol = "zenski";
    this.ekipaServis.dohvatiEkipePoKriterijumu("", sport, disciplina, pol).subscribe((data: Ekipa[]) => {
      this.ekipe = data;
    })
  }

  dohvatiDelegate() {
    this.korisnikServis.dohvatiDelegate().subscribe((data: Korisnik[]) => {
      this.delegati = data;
    })
  }

  ekipniIliPojedinacni() {
    this.jeEkipni = false;
    this.jeMuski = false;
    let sport;
    let disciplina;

    if (this.takmicenje == ""){
      return;
    }

    sport = this.takmicenje.split(" -")[0];
    disciplina = this.takmicenje.split(" -")[1];
    for (let i = 0; i < this.takmicenja.length; i++) {
      if (sport == this.takmicenja[i].sport && disciplina == this.takmicenja[i].disciplina) {
        if (this.takmicenja[i].tip == "ekipni") this.jeEkipni = true;
        if (this.takmicenja[i].pol == "muski") this.jeMuski = true;
        this.takmicari = this.takmicenja[i].takmicari;
      }
    }
    this.dohvatiEkipe();
    this.dohvatiSportiste();
    this.azurirajDelegata();
  }

  unesiSportistu() {
    this.greska = "";
    let sport;
    let disciplina;

    if (this.takmicenje == "" || this.sportista == "") {
      this.greska = "Popunite sva polja!";
      return;
    }

    sport = this.takmicenje.split(" -")[0];
    disciplina = this.takmicenje.split(" -")[1];
    let pol = "muski";
    if (this.jeMuski != true) pol = "zenski";
    let ime = this.sportista.split(" ")[0];
    let prezime = this.sportista.split(" ")[1];
    this.takmicenjeServis.unesiSportistuUTakmicenje(sport, disciplina, pol, ime, prezime).subscribe(response => {
      if (response['message'] == 'uspeh') {
        alert('Takmicenje uspesno zapoceto!');
      }
      else {
        if (response['message'] == 'neuspeh') {
          this.greska = 'Korisnik vec postoji!'
        } else {
          this.greska = 'Greska'
        }
      }
    })
  }

  unesiEkipu() {
    this.greska = "";
    let sport;
    let disciplina;

    if (this.takmicenje == "" || this.ekipa == "") {
      this.greska = "Popunite sva polja!";
      return;
    }

    for (let i = 0; i < this.takmicenja.length; i++){
      if (this.takmicenje == (this.takmicenja[i].sport + " -" + this.takmicenja[i].disciplina)){
        for (let j = 0; j < this.takmicenja[i].takmicari.length; j++){
          if (this.ekipa == this.takmicenja[i].takmicari[j].takmicar){
            this.greska = "Ekipa vec ucestvuje u izabranom takmicenju!";
            return;
          }
        } 
      }
    }

    sport = this.takmicenje.split(" -")[0];
    disciplina = this.takmicenje.split(" -")[1];
    let pol = "muski";
    if (this.jeMuski != true) pol = "zenski";
    this.takmicenjeServis.unesiEkipuUTakmicenje(sport, disciplina, pol, this.ekipa).subscribe(response => {
      if (response['message'] == 'uspeh') {
        alert('USPEH');
      }
      else {
        if (response['message'] == 'neuspeh') {
          this.greska = 'Ekipa je vec uneta!'
        } else {
          this.greska = 'Greska'
        }
      }
    })

    this.dohvatiSvaTakmicenja();
  }

  unesiDelegata() {
    this.greska = "";
    let sport;
    let disciplina;

    if (this.takmicenje == "" || this.delegat == "") {
      this.greska = "Popunite sva polja!";
      return;
    }

    for (let i = 0; i < this.takmicenja.length; i++){
      if (this.takmicenje == (this.takmicenja[i].sport + " -" + this.takmicenja[i].disciplina)){
        if (this.takmicenja[i].delegat != ""){
          this.greska = "Delegat je vec postavljen za izabrano takmicenje!";
          return;
        }
      }
    }

    sport = this.takmicenje.split(" -")[0];
    disciplina = this.takmicenje.split(" -")[1];
    let pol = "muski";
    if (this.jeMuski != true) pol = "zenski";
    let ime = this.delegat.split(" ")[0];
    let prezime = this.delegat.split(" ")[1];

    for (let i = 0; i < this.delegati.length; i++){
      if (this.delegati[i].ime == ime && this.delegati[i].prezime == prezime){
        if (this.delegati[i].broj_takmicenja == 3){
          this.greska = "Delegat vec nadgleda maksimalan broj takmicenja!";
          return;
        }
      }
    }

    this.takmicenjeServis.unesiDelegataUTakmicenje(sport, disciplina, pol, ime, prezime).subscribe(response => {
      if (response['message'] == 'uspeh') {
        alert('USPEH');
        this.dohvatiSvaTakmicenja();
      }
      else {
        if (response['message'] == 'postoji') {
          this.greska = 'Delegat je vec izabran za dato takmicenje!'
        } else {
          this.greska = 'Greska'
        }
      }
    })
    
    this.korisnikServis.azurirajBrojTakmicenjaDelegata(ime, prezime).subscribe(response => {
      if (response['message'] == 'uspeh') {
      }
      else {
          this.greska = 'Greska'
        }    
    })
  }

  azurirajDelegata(){
    this.delegatPostojeci = "";
    let sport = "";
    let disciplina = "";
    sport = this.takmicenje.split(" -")[0];
    disciplina = this.takmicenje.split(" -")[1];
    for (let i = 0; i < this.takmicenja.length; i++) {
      if (sport == this.takmicenja[i].sport && disciplina == this.takmicenja[i].disciplina) {
        this.delegatPostojeci = this.takmicenja[i].delegat;
      }
    }
  }

  zapocniTakmicenje(){
    let sport;
    let disciplina;

    if (this.takmicenje == ""){
      this.greska = "Izaberite takmicenje!"
      return;
    }
    sport = this.takmicenje.split(" -")[0];
    disciplina = this.takmicenje.split(" -")[1];
    let pol = "muski";
    if (this.jeMuski != true) pol = "zenski";
    this.takmicenjeServis.zapocniTakmicenje(sport, disciplina, pol).subscribe(response => {
      if (response['message'] == 'uspeh') {
        alert('USPEH');
      }
      else {
        if (response['message'] == 'neuspeh') {
          this.greska = 'Ekipa je vec uneta!'
        } else {
          this.greska = 'Greska'
        }
      }
    })

    this.dohvatiSvaTakmicenja();
  }

}
