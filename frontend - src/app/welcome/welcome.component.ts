import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit{

  constructor() { 
    let k = JSON.parse(localStorage.getItem('ulogovan'));
      if (k) this.tip = k.tip;
      else this.tip = "";
  }

  ngOnInit(): void {
  }

  tip: string;
  
}



