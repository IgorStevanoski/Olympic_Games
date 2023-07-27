import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LokacijaService } from '../lokacija.service';
import { Desavanje } from '../model/desavanje';
import { Lokacija } from '../model/lokacija';
import { Raspored } from '../model/raspored';
import { Takmicar } from '../model/takmicar';
import { Takmicenje } from '../model/takmicenje';
import { RasporedService } from '../raspored.service';
import { TakmicenjeService } from '../takmicenje.service';

@Component({
  selector: 'app-raspored',
  templateUrl: './raspored.component.html',
  styleUrls: ['./raspored.component.css']
})
export class RasporedComponent implements OnInit {

  constructor(private takmicenjeServis: TakmicenjeService,
    private rasporedServis: RasporedService,
    private lokacijaServis: LokacijaService,
    private ruter: Router) {
    this.takmicenjeServis.dohvatiSvaTakmicenja('zapoceto').subscribe((data: Takmicenje[]) => {
      this.takmicenja = data;
    })
    this.rasporedServis.dohvatiSveRasporede().subscribe((data: Raspored[]) => {
      this.rasporedi = data;
    });
    this.lokacijaServis.dohvatiSveLokacije().subscribe((data: Lokacija[]) => {
      this.lokacije = data;
    });
    this.desavanja = [new Desavanje()];
    //this.desavanje = new Desavanje();
    this.rasporedPostoji = true;
    this.rezultatiUneti = false;
    this.jeEkipni = false;
    this.vremePocetka = "";
    this.lokacija = "";
    this.rezultati = [];
    this.pobednici = [];
    let korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    if (!korisnik) this.ruter.navigate(['welcome']);
    else if (korisnik.tip != "delegat"){
      this.ruter.navigate(['welcome']);
    }
  }

  ngOnInit(): void {

  }

  takmicenjeNaziv: string;
  takmicenje: Takmicenje;
  takmicenja: Takmicenje[];
  raspored: Raspored;
  rasporedi: Raspored[];
  desavanjaPOM: Desavanje[]; //ne koristiti
  desavanja: Desavanje[];
  desavanje: Desavanje;
  lokacija: string;
  lokacije: Lokacija[];
  rezultati: string[];
  greska: string;
  vremePocetka: string;
  rasporedPostoji: boolean;
  rezultatiUneti: boolean;
  jeEkipni: boolean;
  pobednici: Takmicar[];

  azurirajRaspored() {
    this.rezultatiUneti = false;
    this.jeEkipni = false;
    let sport = "";
    let disciplina;
    let pol;
    sport = this.takmicenjeNaziv.split(" - ")[0];
    disciplina = this.takmicenjeNaziv.split(" - ")[1];
    pol = this.takmicenjeNaziv.split(" - ")[2];

    this.raspored = null;
    this.desavanje = null;
    this.rezultati = [];

    this.ekipniProvera();
    if (this.jeEkipni) {
      return;
    }

    for (let i = 0; i < this.rasporedi.length; i++) {
      if (sport == this.rasporedi[i].takmicenje.sport &&
        disciplina == this.rasporedi[i].takmicenje.disciplina &&
        pol == this.rasporedi[i].takmicenje.pol) {
        this.raspored = this.rasporedi[i];
      }
    }

    if (this.raspored) {
      this.rasporedPostoji = true;
      this.desavanje = this.raspored.desavanje;
      if (this.desavanje.ucesnici[0].rezultat == "/") {
        this.rezultatiUneti = false;
      } else {
        this.rezultatiUneti = true;
        this.pobednici = this.desavanje.ucesnici;
      }
      this.rezultati = [];
      for (let i = 0; i < this.desavanje.ucesnici.length; i++) {
        this.rezultati.push(this.desavanje.ucesnici[i].rezultat);
      }

    } else {
      this.rasporedPostoji = false;
    }

  }

  unesiNoviRaspored() {
    let sport;
    let disciplina;
    let pol;
    sport = this.takmicenjeNaziv.split(" - ")[0];
    disciplina = this.takmicenjeNaziv.split(" - ")[1];
    pol = this.takmicenjeNaziv.split(" - ")[2];

    for (let i = 0; i < this.takmicenja.length; i++) {
      if (sport == this.takmicenja[i].sport &&
        disciplina == this.takmicenja[i].disciplina &&
        pol == this.takmicenja[i].pol) {
        this.takmicenje = this.takmicenja[i];
      }
    }

    this.desavanje = new Desavanje();

    this.desavanje.lokacija = this.takmicenje.lokacija;
    this.desavanje.brojKrugova = 1;
    this.desavanje.status = "u toku";
    this.desavanje.ucesnici = this.takmicenje.takmicari;
    this.desavanje.vremePocetka = "";

    for (let i = 0; i < this.rezultati.length; i++) {
      this.rezultati[i] = "/";
    }

    this.rasporedServis.unesiRasporedZaTakmicenje(this.takmicenje, this.desavanje).subscribe(response => {
      if (response['message'] == 'uspeh') {
        this.greska = 'Uspesno dodato!';
        this.rasporedServis.dohvatiSveRasporede().subscribe((data: Raspored[]) => {
          this.rasporedi = data;
          for (let i = 0; i < this.rasporedi.length; i++) {
            if (sport == this.rasporedi[i].takmicenje.sport &&
              disciplina == this.rasporedi[i].takmicenje.disciplina &&
              pol == this.rasporedi[i].takmicenje.pol) {
              this.raspored = this.rasporedi[i];
            }
          }

          if (this.raspored) {
            this.rasporedPostoji = true;
            this.desavanje = this.raspored.desavanje;
          } else {
            this.rasporedPostoji = false;
          }
          this.desavanje = this.raspored.desavanje;
        });
      } else {
        this.greska = 'Greska'
      }
    })
  }

  unosVremena() {
    let sport;
    let disciplina;
    let pol;
    sport = this.takmicenjeNaziv.split(" - ")[0];
    disciplina = this.takmicenjeNaziv.split(" - ")[1];
    pol = this.takmicenjeNaziv.split(" - ")[2];
    let vreme = this.vremePocetka.split("T")[0] + " " + this.vremePocetka.split("T")[1];

    this.rasporedServis.unesiVreme(vreme, sport, disciplina, pol).subscribe(response => {
      if (response['message'] == 'uspeh') {
        this.greska = 'Uspesno dodato vreme!';
        this.rasporedServis.dohvatiSveRasporede().subscribe((data: Raspored[]) => {
          this.rasporedi = data;
          for (let i = 0; i < this.rasporedi.length; i++) {
            if (sport == this.rasporedi[i].takmicenje.sport &&
              disciplina == this.rasporedi[i].takmicenje.disciplina &&
              pol == this.rasporedi[i].takmicenje.pol) {
              this.raspored = this.rasporedi[i];
            }
          }

          if (this.raspored) {
            this.desavanje = this.raspored.desavanje;
          } else {
            this.rasporedPostoji = false;
          }
        });
      } else {
        this.greska = 'Greska'
      }
    })
    this.azurirajRaspored();
  }

  unosRezultata() {
    let sport;
    let disciplina;
    let pol;
    sport = this.takmicenjeNaziv.split(" - ")[0];
    disciplina = this.takmicenjeNaziv.split(" - ")[1];
    pol = this.takmicenjeNaziv.split(" - ")[2];

    for (let i = 0; i < this.rezultati.length; i++) {
      this.desavanje.ucesnici[i].rezultat = this.rezultati[i];
    }

    this.desavanje.status = "gotovo";

    this.pobednici = this.desavanje.ucesnici;

    this.pobednici.sort((a, b) => {
      return b.rezultat.localeCompare(a.rezultat);
    })

    this.rasporedServis.unesiRezultate(this.desavanje, sport, disciplina, pol).subscribe(response => {
      if (response['message'] == 'uspeh') {
        this.greska = 'Uspesno!';
        this.rasporedServis.dohvatiSveRasporede().subscribe((data: Raspored[]) => {
          this.rasporedi = data;
          for (let i = 0; i < this.rasporedi.length; i++) {
            if (sport == this.rasporedi[i].takmicenje.sport &&
              disciplina == this.rasporedi[i].takmicenje.disciplina &&
              pol == this.rasporedi[i].takmicenje.pol) {
              this.raspored = this.rasporedi[i];
            }
          }
          this.desavanje = this.raspored.desavanje;
        });
      } else {
        this.greska = 'Greska'
      }
    })
    this.rezultatiUneti = true;
  }

  ekipniProvera() {
    this.jeEkipni = false;
    let sport;
    let disciplina;
    let pol;
    sport = this.takmicenjeNaziv.split(" - ")[0];
    disciplina = this.takmicenjeNaziv.split(" - ")[1];
    pol = this.takmicenjeNaziv.split(" - ")[2];

    if (!pol) {
      this.jeEkipni = true;
    }
/*     for (let i = 0; i < this.takmicenja.length; i++){
      if (sport == this.takmicenja[i].sport && 
        disciplina == this.takmicenja[i].disciplina){
          if (this.takmicenja[i].tip == "ekipni"){
            this.jeEkipni = true;
          } else {
            this.jeEkipni = false;
          }
        }
    } */
  }

}
