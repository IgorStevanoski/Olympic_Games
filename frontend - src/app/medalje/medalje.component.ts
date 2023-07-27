import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Zemlja } from '../model/zemlja';
import { ZemljaService } from '../zemlja.service';

@Component({
  selector: 'app-medalje',
  templateUrl: './medalje.component.html',
  styleUrls: ['./medalje.component.css']
})
export class MedaljeComponent implements OnInit {

  constructor(private zemljaServis: ZemljaService) { }

  ngOnInit(): void {
    this.zemlje = [];
    this.zemljaServis.dohvatiSveZemlje().subscribe((data: Zemlja[])=>{
      this.zemlje = data;
      this.sortiraj();
      this.dataSource = new MatTableDataSource(this.zemlje);
      this.dataSource.paginator = this.paginator;
    })

  }

  zemlje: Zemlja[];

  displayedColumns: string[] = ['rang', 'zemlja', 'zlato', 'srebro', 'bronza', 'ukupno'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;  

  sortirajPoMedaljama(zemlje) : Zemlja[]{
    return zemlje.sort((a,b)=>{
      if (a.zlatneMedalje != b.zlatneMedalje) return b.zlatneMedalje - a.zlatneMedalje;
      else if (a.srebrneMedalje != b.srebrneMedalje) return b.srebrneMedalje - a.srebrneMedalje;
      else if (a.bronzaneMedalje != b.bronzaneMedalje) return b.bronzaneMedalje - a.bronzaneMedalje; 
    })
  }

  sortiraj(){
    this.zemlje = this.sortirajPoMedaljama(this.zemlje);
  }

}
