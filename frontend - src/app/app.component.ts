import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { KorisnikService } from './korisnik.service';
import { Korisnik } from './model/korisnik';
import { PomocniService } from './pomocni.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private korisnikServis: KorisnikService,
    private pomocniServis: PomocniService, 
    private ruter: Router) { 
      this.clickEventSubscription = this.pomocniServis.getClickEvent().subscribe(()=>{
        this.login();
      })
      let k = JSON.parse(localStorage.getItem('ulogovan'));
      if (k) this.tip = k.tip;
      else this.tip = "";
    }

    clickEventSubscription: Subscription;

  korisnik : Korisnik;
  tip: string;

  login(){
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    this.tip = this.korisnik.tip;
    this.ruter.navigate(['welcome']);
  }

  logout(){
    this.korisnik = null;
    this.tip = "";
    localStorage.clear();
    this.ruter.navigate(['login']);
  }

}
