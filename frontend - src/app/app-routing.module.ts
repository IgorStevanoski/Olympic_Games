import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MedaljeComponent } from './medalje/medalje.component';
import { OdobravanjeComponent } from './odobravanje/odobravanje.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RasporedComponent } from './raspored/raspored.component';
import { RegisterComponent } from './register/register.component';
import { RekordiComponent } from './rekordi/rekordi.component';
import { SportUnosComponent } from './sport-unos/sport-unos.component';
import { SportistaPregledComponent } from './sportista-pregled/sportista-pregled.component';
import { SportistaPretragaComponent } from './sportista-pretraga/sportista-pretraga.component';
import { SportistaUnosComponent } from './sportista-unos/sportista-unos.component';
import { TakmicenjeDopunaComponent } from './takmicenje-dopuna/takmicenje-dopuna.component';
import { TakmicenjeUnosComponent } from './takmicenje-unos/takmicenje-unos.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ZemljeComponent } from './zemlje/zemlje.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'promenaLozinke', component: PromenaLozinkeComponent },
  {path: 'zemlje', component: ZemljeComponent },
  {path: 'medalje', component: MedaljeComponent },
  {path: 'sportisti', component: SportistaPretragaComponent },
  {path: 'sportistiUnos', component: SportistaUnosComponent },
  {path: 'sportUnos', component: SportUnosComponent },
  {path: 'takmicenjeUnos', component: TakmicenjeUnosComponent },
  {path: 'takmicenjeDopuna', component: TakmicenjeDopunaComponent },
  {path: 'rekordi', component: RekordiComponent },
  {path: 'sportistaPregled', component: SportistaPregledComponent },
  {path: 'korisnickiZahtevi', component: OdobravanjeComponent },
  {path: 'raspored', component: RasporedComponent },
  {path: '**', component: WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
