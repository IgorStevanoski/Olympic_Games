import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EkipaService } from '../ekipa.service';
import { Disciplina } from '../model/disciplina';
import { Korisnik } from '../model/korisnik';
import { Sport } from '../model/sport';
import { Sportista } from '../model/sportista';
import { Takmicenje } from '../model/takmicenje';
import { SportService } from '../sport.service';
import { SportistaService } from '../sportista.service';
import { TakmicenjeService } from '../takmicenje.service';

@Component({
  selector: 'app-sportista-unos',
  templateUrl: './sportista-unos.component.html',
  styleUrls: ['./sportista-unos.component.css']
})
export class SportistaUnosComponent implements OnInit {

  constructor(private sportistaServis: SportistaService,
    private sportServis: SportService,
    private takmicenjeServis: TakmicenjeService,
    private ekipaServis: EkipaService,
    private ruter: Router) {
    this.ime = "";
    this.prezime = "";
    this.pol = "";
    this.sport = "";
    this.disciplina = "/";
    this.greska = "";
    this.imaGreske = false;
    this.jeEkipni = false;
    this.min = 1;
    this.max = 1;
    this.tip = "";
    this.sportServis.dohvatiSveUneteSportove().subscribe((data: Sport[]) => {
      this.sportovi = data;
      this.sportovi.sort((a, b) => {
        return a.ime.localeCompare(b.ime);
      })
    })
    takmicenjeServis.dohvatiSvaTakmicenja("").subscribe((data: Takmicenje[]) => {
      this.takmicenja = data;
    })
    let korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    if (!korisnik) this.ruter.navigate(['welcome']);
    else if (korisnik.tip != "vodja nacionalne delegacije"){
      this.ruter.navigate(['welcome']);
    }

  }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    this.zemlja = this.korisnik.nacionalnost;
  }

  ime: string;
  prezime: string;
  pol: string;
  sport: string;
  sportovi: Sport[];
  disciplina: string;
  discipline: Disciplina[];
  sportisti: Sportista[];
  zemlja: string;
  takmicenja: Takmicenje[];
  sportistiZaUnos: Sportista[];
  sportistiOdabrani: string[];
  min: number;
  max: number;
  tip: string;

  imaGreske: boolean;
  jeEkipni: boolean;


  korisnik: Korisnik;

  greska: string;

  prijaviSportistu() {
    this.imaGreske = false;
    this.greska = "";

    if (this.ime == "" || this.prezime == "" || this.pol == "" || this.sport == "" || this.disciplina == "/") {
      this.greska = "Popunite sva polja!";
      return;
    }
    /*     if (this.tip == "ekipni"){
          this.greska = "Tip izabrane sportske discipline je ekipni!";
          return;
        } */
    for (let i = 0; i < this.takmicenja.length; i++) {
      if (this.takmicenja[i].sport == this.sport && this.takmicenja[i].disciplina == this.disciplina) {
        this.greska = "Takmicenje iz izabrane sportske discipline je u toku!";
        return;
      }
    }

    this.sportistaServis.proveriSportistu(this.ime, this.prezime).subscribe((data: Sportista[]) => {
      this.sportisti = data;
      if (this.sportisti) {
        for (let i = 0; i < this.sportisti.length; i++) {
          if (this.sportisti[i].sport != this.sport) {
            this.greska = "Sportista je vec prijavljen za drugi sport!";
            this.imaGreske = true;
            return;
          }
        }
        for (let i = 0; i < this.sportisti.length; i++) {
          if (this.sportisti[i].disciplina == this.disciplina) {
            this.greska = "Sportista je vec prijavljen za datu disciplinu!";
            this.imaGreske = true;
            return;
          }
        }
      }
      if (!this.imaGreske) {
        this.sportistaServis.prijaviSportistu(this.ime, this.prezime, this.zemlja, this.sport,
          this.disciplina, false, this.pol).subscribe(response => {
            if (response['message'] == 'uspeh') {
              alert('USPEH');
              this.dohvatiSportiste();
            }
            else {
              this.greska = 'Greska'
            }
          })
      }
    })
  }


  proveriSportistu() {
    this.sportistaServis.proveriSportistu(this.ime, this.prezime).subscribe((data: Sportista[]) => {
      this.sportisti = data;
      this.imaGreske = false;
      if (this.sportisti) {
        for (let i = 0; i < this.sportisti.length; i++) {
          if (this.sportisti[i].sport != this.sport) {
            this.greska = "Sportista je vec prijavljen za drugi sport!";
            this.imaGreske = true;
            return;
          }
        }
        for (let i = 0; i < this.sportisti.length; i++) {
          if (this.sportisti[i].disciplina == this.disciplina) {
            this.greska = "Sportista je vec prijavljen za datu disciplinu!";
            this.imaGreske = true;
            return;
          }
        }
      }
    })
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
  }

  azurirajMinMax() {
    for (let i = 0; i < this.discipline.length; i++) {
      if (this.discipline[i].disciplina == this.disciplina) {
        this.max = this.discipline[i].max;
        this.min = this.discipline[i].min;
        this.tip = this.discipline[i].tip;
        break;
      }
    }
  }

  dohvatiSportiste() {
    if (this.disciplina == "/") return;
    this.sportistaServis.dohvatiSportistePoKriterijumu("", "", this.zemlja,
      this.sport, this.disciplina, false, this.pol).subscribe((data: Sportista[]) => {
        this.sportistiZaUnos = data;
      })
    this.azurirajMinMax();
  }

  prijaviEkipu() {
    this.imaGreske = false;
    this.greska = "";

    if (this.pol == "" || this.sport == "" || this.disciplina == "/") {
      this.greska = "Popunite sva polja!";
      return;
    }

    if (this.tip == "pojedinacni") {
      this.greska = "Ne mozete prijaviti ekipnu za pojedinacnu sportsku disciplinu!";
      return;
    }

    if (this.sportistiOdabrani.length < this.min || this.sportistiOdabrani.length > this.max){
      this.greska = "Niste odabrali odgovarajuci broj sportista za ekipu!";
      return;
    }

    for (let i = 0; i < this.takmicenja.length; i++) {
      if (this.takmicenja[i].sport == this.sport && this.takmicenja[i].disciplina == this.disciplina) {
        this.greska = "Takmicenje iz izabrane sportske discipline je u toku!";
        return;
      }
    }

    this.ekipaServis.unesiEkipu(this.zemlja, this.sport, this.disciplina, 
      this.pol, this.sportistiOdabrani).subscribe(response => {
        if (response['message'] == 'uspeh') {
          alert('USPEH');
        }
        else {
          this.greska = 'Greska'
        }
      })

  }
  /*   pretrazi() {
      let ime;
      let prezime;
      ime = this.ime_prezime.split(" ")[0];
      prezime = this.ime_prezime.split(" ")[1];
      if (!prezime) prezime = "";
      this.sportistaServis.dohvatiSportistePoKriterijumu(ime, prezime, this.zemlja,
        this.sport, this.disciplina, this.medalja, this.pol).subscribe((data: Sportista[]) => {
          this.sportisti = data;
          this.dataSource = new MatTableDataSource(this.sportisti);
          this.dataSource.paginator = this.paginator;
        })
    } */

}
