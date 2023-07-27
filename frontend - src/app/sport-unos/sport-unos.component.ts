import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Disciplina } from '../model/disciplina';
import { Sport } from '../model/sport';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-sport-unos',
  templateUrl: './sport-unos.component.html',
  styleUrls: ['./sport-unos.component.css']
})
export class SportUnosComponent implements OnInit {

  constructor(private sportServis: SportService,
    private ruter: Router) { 
    let korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    if (!korisnik) this.ruter.navigate(['welcome']);
    else if (korisnik.tip != "organizator"){
      this.ruter.navigate(['welcome']);
    }
  }

  ngOnInit(): void {
    this.sport = "";
    this.disciplina = "/";
    this.greska = "";
    this.min = 1;
    this.max = 1;
    this.sportServis.dohvatiSveSportove().subscribe((data: Sport[]) => {
      this.sportovi = data;
      this.sportovi.sort((a, b) => {
        return a.ime.localeCompare(b.ime);
      })
    })
    this.dohvatiSveUneteSportove();
  }

  sportovi: Sport[];
  sportoviUneti: Sport[];
  sport: string;
  discipline: Disciplina[];
  disciplina: string;
  greska: string;
  postoji: boolean;
  min: number;
  max: number;
  tip: string;

  azurirajDiscipline() {
    this.discipline = [];
    for (let i = 0; i < this.sportovi.length; i++) {
      if (this.sportovi[i].ime == this.sport) {
        this.discipline = this.sportovi[i].discipline;
        break;
      }
    }
  }

  unesiSport() {
    this.greska = "";
    if (this.sport == "") {
      this.greska = "Niste izabrali sport!"
      return;
    }
    this.sportServis.unesiSport(this.sport).subscribe(response => {
      if (response['message'] == 'postoji') {
        this.greska = 'Sport vec postoji!';
      } else {
        if (response['message'] == 'uspeh') {
          this.greska = 'Uspesno dodato!'
          this.dohvatiSveUneteSportove();
        } else {
          this.greska = 'Greska'
        }
      }
    })
  }

  unesiDisciplinu() {
    this.greska = "";
    this.postoji = false;
    if (this.disciplina == "/") {
      this.greska = "Niste izabrali disciplinu!"
      return;
    }
    if (this.tip != "ekipni") {
      if (this.tip != "pojedinacni"){
        this.greska = "Niste izabrali tip!"
        return;
      }
    }

    if (this.min < 1 || this.max < 1 || this.min > this.max){
      this.greska = "Nisu validne vrednosti za broj clanova ekipe!";
      return;
    }

    for (let i = 0; i < this.sportoviUneti.length; i++) {
      if (this.sportoviUneti[i].ime == this.sport) {
        this.postoji = true;
      }
    }
    
    if (!this.postoji) {
      this.greska = "Morate prvo uneti odgovarajuci sport!";
      return;
    }

    this.sportServis.unesiDisciplinu(this.sport, this.disciplina, this.min, this.max, this.tip).subscribe(response => {
      if (response['message'] == 'postoji') {
        this.greska = 'Disciplina vec postoji!';
      } else {
        if (response['message'] == 'uspeh') {
          this.greska = 'Uspesno dodato!'
        } else {
          this.greska = 'Greska'
        }
      }
    })
  }

  dohvatiSveUneteSportove() {
    this.sportServis.dohvatiSveUneteSportove().subscribe((data: Sport[]) => {
      this.sportoviUneti = data;
    })
  }

  resetujMinMax(){
    this.min = 1;
    this.max = 1;
  }

}


/* registruj() {
  let imaGreske = false;
  this.greska = '';
  this.greskaLozinka = '';
  this.greskaRegex = '';
  if (!this.kor_ime || !this.lozinka || !this.ime || !this.prezime || !this.nacionalnost
    || !this.mejl || !this.tip) {
    this.greskaLozinka = '';
    this.greska = 'Popunite sva polja!';
    imaGreske = true;
  }
  if (this.lozinka != this.lozinkaProvera) {
    this.greskaLozinka = 'Lozinke se ne poklapaju!';
    imaGreske = true;
  }
  if (!this.provera()) {
    this.greskaRegex = 'Nije dobra sifra!';
    imaGreske = true;
  }
  if (imaGreske) {
    return;
  }
  this.korisnikServis.registruj(this.kor_ime, this.lozinka, this.ime, this.prezime, this.nacionalnost,
    this.mejl, this.tip).subscribe(response => {
      if (response['message'] == 'uspeh') {
        alert('USPEH');
      }
      else {
        if (response['message'] == 'neuspeh') {
          this.greska = 'Korisnik vec postoji!'
        } else {
          this.greska = 'Greska'
        }
      }
    })
} */