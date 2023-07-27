import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Rekord } from '../model/rekord';
import { RekordService } from '../rekord.service';

@Component({
  selector: 'app-rekordi',
  templateUrl: './rekordi.component.html',
  styleUrls: ['./rekordi.component.css']
})
export class RekordiComponent implements OnInit {

  constructor(private rekordServis: RekordService,
    private ruter: Router) { 
    let korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    if (!korisnik) this.ruter.navigate(['welcome']);
    else if (korisnik.tip != "organizator"){
      this.ruter.navigate(['welcome']);
    }
  }

  ngOnInit(): void {
    this.rekordi = [];
    this.rekordServis.dohvatiSveRekorde().subscribe((data: Rekord[]) => {
      this.rekordi = data;
      this.dataSource = new MatTableDataSource(this.rekordi);
      this.dataSource.paginator = this.paginator;
    })
  }

  ngAfterViewInit() {
    //this.dataSource = new MatTableDataSource(this.zemlje);
    //this.dataSource.paginator = this.paginator;  
  }


  rekordi: Rekord[];
  displayedColumns: string[] = ['disciplina', 'rekord', 'sportista', 'zemlja', 'mesto', 'godina'];
  dataSource = new MatTableDataSource();


  @ViewChild(MatPaginator) paginator: MatPaginator;

}
