import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Zemlja } from '../model/zemlja';
import { SportistaService } from '../sportista.service';
import { ZemljaService } from '../zemlja.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-zemlje',
  templateUrl: './zemlje.component.html',
  styleUrls: ['./zemlje.component.css']
})
export class ZemljeComponent implements OnInit, AfterViewInit {

  constructor(private zemljaServis: ZemljaService,
    private sportistaServis: SportistaService) { }


  ngOnInit(): void {
    this.zemlje = [];
    this.zemljaServis.dohvatiSveZemlje().subscribe((data: Zemlja[]) => {
      this.zemlje = data;
      for (let i = 0; i < this.zemlje.length; i++) {
        this.sportistaServis.dohvatiBrojRazlicitihSportistaZemlje(this.zemlje[i].ime).subscribe((data: number) => {
          this.zemlje[i].brojSportista = data;
        })
      }
      this.dataSource = new MatTableDataSource(this.zemlje);
      this.dataSource.paginator = this.paginator;
    })
  }

  ngAfterViewInit() {
    //this.dataSource = new MatTableDataSource(this.zemlje);
    //this.dataSource.paginator = this.paginator;  
  }


  zemlje: Zemlja[];
  displayedColumns: string[] = ['zastava', 'ime', 'brojSportista'];
  dataSource = new MatTableDataSource();


  @ViewChild(MatPaginator) paginator: MatPaginator;

}
