import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { ZemljeComponent } from './zemlje/zemlje.component';
import { SportistaPretragaComponent } from './sportista-pretraga/sportista-pretraga.component';
import { MedaljeComponent } from './medalje/medalje.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SportistaUnosComponent } from './sportista-unos/sportista-unos.component';
import { SportUnosComponent } from './sport-unos/sport-unos.component';
import { TakmicenjeUnosComponent } from './takmicenje-unos/takmicenje-unos.component';
import { TakmicenjeDopunaComponent } from './takmicenje-dopuna/takmicenje-dopuna.component';
import { RekordiComponent } from './rekordi/rekordi.component';
import { SportistaPregledComponent } from './sportista-pregled/sportista-pregled.component';
import { OdobravanjeComponent } from './odobravanje/odobravanje.component';
import { RasporedComponent } from './raspored/raspored.component';


// instaliranje angular mat: ng add @angular/material

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    RegisterComponent,
    PromenaLozinkeComponent,
    ZemljeComponent,
    SportistaPretragaComponent,
    MedaljeComponent,
    SportistaUnosComponent,
    SportUnosComponent,
    TakmicenjeUnosComponent,
    TakmicenjeDopunaComponent,
    RekordiComponent,
    SportistaPregledComponent,
    OdobravanjeComponent,
    RasporedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, //?
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
