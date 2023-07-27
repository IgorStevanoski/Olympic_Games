import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../model/korisnik';

@Component({
  selector: 'app-odobravanje',
  templateUrl: './odobravanje.component.html',
  styleUrls: ['./odobravanje.component.css']
})
export class OdobravanjeComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService,
    private ruter: Router) {
    this.korisnikServis.dohvatiZahteve().subscribe((kor: Korisnik[]) => {
      this.korisnickiZahtevi = kor;
    })
    this.korisnik = new Korisnik();
    let korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    if (!korisnik) this.ruter.navigate(['welcome']);
    else if (korisnik.tip != "organizator"){
      this.ruter.navigate(['welcome']);
    }
  }

  ngOnInit(): void {
  }

  korisnickiZahtevi: Korisnik[];
  korisnik: Korisnik;

  kor_ime: string;
  lozinka: string;
  ime: string;
  prezime: string;
  zemlja: string;
  mejl: string;
  tip: string;
  poruka: string;

  odobri() {
    this.poruka = "";

    if (!this.kor_ime || !this.lozinka || !this.ime || !this.prezime || !this.mejl || !this.tip) {
      this.poruka = 'Niste izabrali zahtev!';
      return;
    }

    this.korisnikServis.odobriZahtev(this.kor_ime, this.lozinka, this.ime, this.prezime, this.zemlja,
      this.mejl, this.tip, 0).subscribe(response => {
        if (response['message'] == 'uspeh') {
          this.poruka = "Zahtev je odobren!"
        }
        else {
          this.poruka = 'Greska';
        }
      });
      this.korisnikServis.odbaciZahtev(this.kor_ime).subscribe(response => {
          if (response['message'] == 'uspeh') {
            this.poruka = "Zahtev je odobren!"
          }
          else {
            this.poruka = 'Greska';
          }
        });
        this.dohvatiZahteve();
  }

  odbij() {
    this.poruka = "";

    if (!this.kor_ime || !this.lozinka || !this.ime || !this.prezime || !this.mejl || !this.tip) {
      this.poruka = 'Niste izabrali zahtev!';
      return;
    }

    this.korisnikServis.odbaciZahtev(this.kor_ime).subscribe(response => {
      if (response['message'] == 'uspeh') {
        this.poruka = "Zahtev je odbacen!"
      }
      else {
        this.poruka = 'Greska';
      }
      this.dohvatiZahteve();
    });
  }

  azurirajKorisnika() {
    for (let i = 0; i < this.korisnickiZahtevi.length; i++) {
      if (this.kor_ime == this.korisnickiZahtevi[i].kor_ime) {
        this.korisnik = this.korisnickiZahtevi[i];
        break;
      }
    }
    this.lozinka = this.korisnik.lozinka;
    this.ime = this.korisnik.ime;
    this.prezime = this.korisnik.prezime;
    this.zemlja = this.korisnik.nacionalnost;
    this.mejl = this.korisnik.mejl;
    this.tip = this.korisnik.tip;
  }

  dohvatiZahteve(){
    this.korisnikServis.dohvatiZahteve().subscribe((kor: Korisnik[]) => {
      this.korisnickiZahtevi = kor;
    })
    this.korisnik = new Korisnik();
    this.kor_ime = "";
    this.lozinka = "";
    this.ime = "";
    this.prezime = "";
    this.zemlja = "";
    this.mejl = "";
    this.tip = "";
  }

}
