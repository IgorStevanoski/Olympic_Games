import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Disciplina } from '../model/disciplina';
import { Sport } from '../model/sport';
import { Sportista } from '../model/sportista';
import { Zemlja } from '../model/zemlja';
import { SportService } from '../sport.service';
import { SportistaService } from '../sportista.service';
import { ZemljaService } from '../zemlja.service';

@Component({
  selector: 'app-sportista-pretraga',
  templateUrl: './sportista-pretraga.component.html',
  styleUrls: ['./sportista-pretraga.component.css']
})
export class SportistaPretragaComponent implements OnInit {

  constructor(private sportistaServis: SportistaService, 
    private zemljaServis: ZemljaService,
    private sportServis: SportService) { }

  ngOnInit(): void {
    this.ime_prezime = "";
    this.zemlja = "";
    this.sport = "";
    this.disciplina = "";
    this.medalja = false;
    this.pol = "";
    this.zemlje = [];
    this.zemljaServis.dohvatiSveZemlje().subscribe((data: Zemlja[]) => {
      this.zemlje = data;
      this.zemlje.sort((a,b)=>{
        return a.ime.localeCompare(b.ime);
      })
    })
    this.sportServis.dohvatiSveSportove().subscribe((data: Sport[]) => {
      this.sportovi = data;
      this.sportovi.sort((a,b)=>{
        return a.ime.localeCompare(b.ime);
      })
    })
    this.sportistaServis.dohvatiSportistePoKriterijumu("", "", this.zemlja,
      this.sport, this.disciplina, this.medalja, this.pol).subscribe((data: Sportista[]) => {
        this.sportisti = data;
        this.sportisti.sort((a,b)=>{
          return a.ime.localeCompare(b.ime);
        })
        this.dataSource = new MatTableDataSource(this.sportisti);
        this.dataSource.paginator = this.paginator;
      })
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;  

  displayedColumns: string[] = ['ime i prezime', 'zemlja', 'sport', 'disciplina', 'pol', 'medalja'];
  dataSource = new MatTableDataSource();

  sportisti: Sportista[];
  ime_prezime: string;
  zemlje: Zemlja[];
  zemlja: string;
  sportovi: Sport[];
  sport: string;
  discipline: Disciplina[];
  disciplina: string;
  pol: string;
  medalja: boolean;

  pretrazi() {
    let ime;
    let prezime;
    ime = this.ime_prezime.split(" ")[0];
    prezime = this.ime_prezime.split(" ")[1];
    if (!prezime) prezime = "";
    this.sportistaServis.dohvatiSportistePoKriterijumu(ime, prezime, this.zemlja,
      this.sport, this.disciplina, this.medalja, this.pol).subscribe((data: Sportista[]) => {
        this.sportisti = data;
        this.sportisti.sort((a,b)=>{
          return a.ime.localeCompare(b.ime);
        })
        this.dataSource = new MatTableDataSource(this.sportisti);
        this.dataSource.paginator = this.paginator;
      })
  }

  azurirajDiscipline(){
    this.discipline = [];
    for (let i = 0; i < this.sportovi.length; i++){
      if (this.sportovi[i].ime == this.sport){
        this.discipline = this.sportovi[i].discipline;
        break;
      }
    }
  }

}
