import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Disciplina } from '../model/disciplina';
import { Korisnik } from '../model/korisnik';
import { Sport } from '../model/sport';
import { Sportista } from '../model/sportista';
import { SportService } from '../sport.service';
import { SportistaService } from '../sportista.service';

@Component({
  selector: 'app-sportista-pregled',
  templateUrl: './sportista-pregled.component.html',
  styleUrls: ['./sportista-pregled.component.css']
})
export class SportistaPregledComponent implements OnInit {

  constructor(private sportistaServis: SportistaService,
    private sportServis: SportService,
    private ruter: Router) { 
      this.disciplina = "/";
      this.nemaDiscipline = false;
      this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
      this.zemlja = this.korisnik.nacionalnost;
      let korisnik = JSON.parse(localStorage.getItem('ulogovan'));
      if (!korisnik) this.ruter.navigate(['welcome']);
      else if (korisnik.tip != "vodja nacionalne delegacije"){
        this.ruter.navigate(['welcome']);
      }
    }

  ngOnInit(): void {
    this.dohvatiSveUneteSportove();
  }

  sport: string;
  sportovi: Sport[];
  disciplina: string;
  discipline: Disciplina[];
  sportisti: Sportista[];
  sportistiBroj: Sportista[];
  nemaDiscipline: boolean;
  zemlja: string;
  korisnik: Korisnik;

  dohvatiSveUneteSportove() {
    this.sportServis.dohvatiSveUneteSportove().subscribe((data: Sport[]) => {
      this.sportovi = data;
      for (let i = 0; i < this.sportovi.length; i++) {
        let sport = this.sportovi[i].ime;
        this.sportistaServis.dohvatiBrojRazlicitihSportistaPoKriterijumu(this.zemlja, sport, "").subscribe((data: number) => {
          this.sportovi[i].broj = data;
        })
      }
    })
  }

  azurirajSport(ime){
    this.sport = ime;
    this.nemaDiscipline = false;
    this.sportisti = [];
    this.azurirajDiscipline();
  }

  azurirajDiscipline() {
    this.disciplina = "/";
    this.discipline = [];
    for (let i = 0; i < this.sportovi.length; i++) {
      if (this.sportovi[i].ime == this.sport) {
        this.discipline = this.sportovi[i].discipline;
        break;
      }
    }
    for (let j = 0; j < this.discipline.length; j++){
      let dis = this.discipline[j].disciplina;
      this.sportistaServis.dohvatiBrojRazlicitihSportistaPoKriterijumu(this.zemlja, this.sport, dis).subscribe((data: number) => {
        this.discipline[j].broj = data;
      })
    }

    if (this.discipline[0].disciplina == "") {
      this.nemaDiscipline = true;
      this.dohvatiSportiste("");
    }
  }

  dohvatiSportiste( disciplina) {
    let pol = "";
    this.disciplina = disciplina;
    this.sportistaServis.dohvatiSportistePoKriterijumu("", "", this.zemlja, this.sport, this.disciplina, false, pol).subscribe((data: Sportista[]) => {
      this.sportisti = data;
      this.sportisti.sort((a,b)=>{
        return a.ime.localeCompare(b.ime);
      })
      this.sportisti.sort((a,b)=>{
        return a.prezime.localeCompare(b.prezime);
      })
    })
  }

}
