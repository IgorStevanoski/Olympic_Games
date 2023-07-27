import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../model/korisnik';
import { Zemlja } from '../model/zemlja';
import { ZemljaService } from '../zemlja.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService,
    private zemljaServis: ZemljaService,
    private ruter: Router) { }

  ngOnInit(): void {
    this.zemlje = [];
    this.zemljaServis.dohvatiSveZemlje().subscribe((data: Zemlja[]) => {
      this.zemlje = data;
      this.zemlje.sort((a, b) => {
        return a.ime.localeCompare(b.ime);
      })
    })
    this.korisnikServis.dohvatiVodje().subscribe((data: Korisnik[]) => {
      this.vodjeDelegacije = data;
    })
  }

  kor_ime: string;
  lozinka: string;
  ime: string;
  prezime: string;
  nacionalnost: string;
  zemlje: Zemlja[];
  mejl: string;
  tip: string;

  vodjeDelegacije : Korisnik[];

  lozinkaProvera: string;
  greskaLozinka: string;
  greskaRegex: string;
  greskaMailRegex: string;
  greskaZemlja: string;
  greska: string;
  uspeh: string;

  registruj() {
    let imaGreske = false;
    this.greska = '';
    this.greskaLozinka = '';
    this.greskaRegex = '';
    this.greskaMailRegex = '';
    this.greskaZemlja = '';
    this.uspeh = '';
    if (!this.kor_ime || !this.lozinka || !this.ime || !this.prezime || !this.nacionalnost
      || this.nacionalnost == "" || !this.mejl || !this.tip) {
      this.greskaLozinka = '';
      this.greska = 'Popunite sva polja!';
      imaGreske = true;
    }
    if (this.lozinka != this.lozinkaProvera) {
      this.greskaLozinka = 'Lozinke se ne poklapaju!';
      imaGreske = true;
    }
    if (!this.provera()) {
      this.greskaRegex = 'Sifra nije u odgovarajucem formatu!';
      imaGreske = true;
    }
    if (!this.proveraMejl()) {
      this.greskaMailRegex = 'Mejl nije u odgovarajucem formatu!';
      imaGreske = true;
    }
    
    for (let i = 0; i < this.vodjeDelegacije.length; i++){
      if (this.vodjeDelegacije[i].nacionalnost == this.nacionalnost && 
        this.tip == "vodja nacionalne delegacije"){
          this.greskaZemlja = "Vodja nacionalne delegacije za izabranu zemlju vec postoji!"
          imaGreske = true;
        }
    }

    if (imaGreske) {
      return;
    }
    this.korisnikServis.registruj(this.kor_ime, this.lozinka, this.ime, this.prezime, this.nacionalnost,
      this.mejl, this.tip, 0).subscribe(response => {
        if (response['message'] == 'uspeh') {
          this.uspeh = "Uspesno ste napravili korisnicki zahtev za registraciju!"
        }
        else {
          if (response['message'] == 'neuspeh') {
            this.greska = 'Korisnik vec postoji!'
          } else {
            if (response['message'] == 'postoji') {
              this.greska = 'Korisnicki zahtev vec postoji!'
            } else {
              this.greska = 'Greska'
            }
          }
        }
      })
  }

  provera() {
    let lose = false;
    const regex = new RegExp("^[a-zA-z](?=(.*\\d){2,})(?=(.*\\W){2,})(?=(.*[a-z]){3,})(?=.*[A-Z]).{8,12}$");
    lose = regex.test(this.lozinka);
    const regex2 = new RegExp("([a-zA-Z\\d])\\1\\1");
    return (!regex2.test(this.lozinka) && lose);
    //const regex = new RegExp("^[a-zA-z](?=(.*\\d){2,})(?=(.*\\W){2,})(?=(.*[a-z]){3,})(?=.*[A-Z]).{8,12}$");
    //return (regex.test(this.lozinka));
  }

  proveraMejl() {
    const regex = new RegExp("^.+@.+\.com$");
    return regex.test(this.mejl);
  }
}

//"([a-z\\d])\\1\\1"

//Lozinka treba da bude validirana, tako da ima minimalno 1 veliki karakter, 1 mali karakter, 1 broj/numerik
//i najmanje 8 karaktera ukupno.

//"((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,})"

/* Pравила за креирање лозинке: треба да има најмање 8 карактера, а највише 12 карактера. Минималан број
великих слова је 1, минималан број малих слова је 3, минималан број нумерика је 2 и минималан број
специјалних карактера је такође 2. Почетни карактер мора бити слово мало или велико. Максималан број
узастопних карактера је три. */

//"(?=.*[a-z]){2,}(?=.*[A-Z]).{8,12}"
