import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LokacijaService } from '../lokacija.service';
import { Disciplina } from '../model/disciplina';
import { Format } from '../model/format';
import { Lokacija } from '../model/lokacija';
import { Sport } from '../model/sport';
import { SportService } from '../sport.service';
import { TakmicenjeService } from '../takmicenje.service';

@Component({
  selector: 'app-takmicenje-unos',
  templateUrl: './takmicenje-unos.component.html',
  styleUrls: ['./takmicenje-unos.component.css']
})
export class TakmicenjeUnosComponent implements OnInit {

  constructor(private sportServis: SportService,
    private lokacijaServis: LokacijaService,
    private takmicenjeServis: TakmicenjeService,
    private ruter: Router) {
    this.dohvatiSveUneteSportove();
    this.dohvatiLokacije();
    let dan = new Date();
    let brojdana = "";
    let mesec = "";
    if (dan.getMonth() < 10) { mesec = "0" + (dan.getMonth() + 1).toString() }
    else { mesec = (dan.getMonth() + 1).toString() }
    if (dan.getDay() < 10) { brojdana = "0" + dan.getDay().toString() }
    else { brojdana = dan.getDay().toString() }
    this.danas = dan.getFullYear().toString() + "-" + mesec + "-" + brojdana;
    this.datumPocetka = this.danas;
    this.pol = "";
    this.tip = "";
    this.greska = "";
    this.sport = "";
    this.disciplina = "/";
    this.lokacija = "";
    this.format = new Format();
    this.format.brojKrugova = 2;
    this.format.brojTakmicaraMAX = 8;
    this.format.brojTakmicaraMIN = 2;
    this.format.rezultat = "ss,tt";
    let korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    if (!korisnik) this.ruter.navigate(['welcome']);
    else if (korisnik.tip != "organizator"){
      this.ruter.navigate(['welcome']);
    }
  }

  ngOnInit(): void {
    this.azurirajDiscipline();
  }

  sport: string;
  sportovi: Sport[];
  disciplina: string;
  discipline: Disciplina[];
  lokacija: string;
  lokacije: Lokacija[];
  pol: string;
  danas: string;
  datumPocetka: string;
  tip: string;
  format: Format;

  greska: string;


  dohvatiSveUneteSportove() {
    this.sportServis.dohvatiSveUneteSportove().subscribe((data: Sport[]) => {
      this.sportovi = data;
    })
  }

  dohvatiLokacije() {
    this.lokacijaServis.dohvatiSveLokacije().subscribe((data: Lokacija[]) => {
      this.lokacije = data;
    })
  }

  azurirajDiscipline() {
    this.tip = "";
    this.disciplina = "/";
    this.discipline = [];
    for (let i = 0; i < this.sportovi.length; i++) {
      if (this.sportovi[i].ime == this.sport) {
        this.discipline = this.sportovi[i].discipline;
        break;
      }
    }
  }

  unesi() {
    this.greska = "";
    if (this.pol == "" || this.tip == "" || this.sport == ""
      || this.disciplina == "/" || this.lokacija == "") {
      this.greska = "Popunite sva polja!";
      return;
    }

    this.takmicenjeServis.unesiTakmicenje(this.sport, this.disciplina, this.pol,
      this.datumPocetka, this.lokacija, this.tip, "", this.format, "formirano").subscribe(response => {
        if (response['message'] == 'uspeh') {
          alert('USPEH');
        }
        else {
          if (response['message'] == 'postoji') {
            this.greska = 'Vec postoji takmicenje iz izabrane discipline!';
          } else {
            this.greska = 'Doslo je do greske!';
          }
        }
      })
  }

  azurirajTip() {
    if (this.discipline) {
      for (let i = 0; i < this.discipline.length; i++) {
        if (this.disciplina == this.discipline[i].disciplina) {
          this.tip = this.discipline[i].tip;
        }
      }
    }
  }

}
