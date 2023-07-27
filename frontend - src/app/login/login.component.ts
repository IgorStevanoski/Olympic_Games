import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../model/korisnik';
import { PomocniService } from '../pomocni.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService,
    private pomocniServis: PomocniService, 
    private ruter: Router) { }

  ngOnInit(): void {
  }

  kor_ime: string;
  lozinka: string;
  greska: string;

  prijava(){
    this.korisnikServis.prijavaNaSistem(this.kor_ime, this.lozinka).
    subscribe((kor: Korisnik)=>{
      if(kor){
        //alert(kor.kor_ime);
        localStorage.setItem('ulogovan', JSON.stringify(kor));
        this.pomocniServis.sendCLickEvent();
        /*if(kor.tip=='S'){
          this.ruter.navigate(['korisnik'])
        }
        else{
          this.ruter.navigate(['admin'])
        }*/
      }
      else{
        this.greska = 'Uneti podaci nisu validni!'
      }
      
    })
  }

  registracija(){
    this.ruter.navigate(['register']);
  }

}
