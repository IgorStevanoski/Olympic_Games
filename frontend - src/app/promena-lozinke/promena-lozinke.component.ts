import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../model/korisnik';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService,
    private ruter: Router) { }

  ngOnInit(): void {
  }

  kor_ime: string;
  lozinka: string;
  lozinkaNova: string;
  greska: string;
  //greskaLozinka: string;
  greskaLozinkaNova: string;


  promeniSifru() {
    this.greska = '';
    //this.greskaLozinka = '';
    this.greskaLozinkaNova = '';
    let imaGreske = false;
    if (this.lozinkaNova == this.lozinka) {
      this.greska = 'Nova lozinka ne sme biti ista kao stara!';
      imaGreske = true;
    }
    /*if (!this.provera(this.lozinka)) {
      this.greskaLozinka = 'Lozinka nije u odgovarajucem formatu!';
      imaGreske = true;
    }*/
    if (!this.provera(this.lozinkaNova)) {
      this.greskaLozinkaNova = 'Nova lozinka nije u odgovarajucem formatu!';
      imaGreske = true;
    }
    if (imaGreske) {
      return;
    }

    this.korisnikServis.promeniSifru(this.kor_ime, this.lozinka, this.lozinkaNova).
      subscribe(response => {
        if (response['message'] == 'uspeh') {
          alert('Uspesna promena sifre!');
          this.ruter.navigate(['login']);
        }
        else {
          this.greska = 'Uneti podaci nisu validni!'
        }

      })
  }

  provera(sifra) {
    let lose = false;
    const regex = new RegExp("^[a-zA-z](?=(.*\\d){2,})(?=(.*\\W){2,})(?=(.*[a-z]){3,})(?=.*[A-Z]).{8,12}$");
    lose = regex.test(sifra);
    const regex2 = new RegExp("([a-zA-Z\\d])\\1\\1");
    return (!regex2.test(sifra) && lose);
    //const regex = new RegExp("^[a-zA-z](?=(.*\\d){2,})(?=(.*\\W){2,})(?=(.*[a-z]){3,})(?=.*[A-Z]).{8,12}$");
    //return (regex.test(this.lozinka));
  }

}
