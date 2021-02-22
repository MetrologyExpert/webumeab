import { DataSource } from '@angular/cdk/collections';
import { InstrumentService } from './../instrument.service';
import { Component, OnInit } from '@angular/core';
import { Instrument } from '../model/instrument.model';
import { Observable } from 'rxjs/internal/Observable';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'instrument-list',
  templateUrl: './instrument-list.component.html',
  styleUrls: ['./instrument-list.component.css']
})

export class InstrumentListComponent  {
   

  constructor( private instrumentService: InstrumentService) { }

  displayedColumns = ['id', 'name', 'description', 'imagePath', 'edit', 'delete'];
  dataSource = new PostDataSource(this.instrumentService)

}

export class PostDataSource extends DataSource<any> {

  paginator: MatPaginator;
  sort: MatSort;

  constructor(private dataService: InstrumentService) {
    super();
  }

  connect(): Observable<Instrument[]> {
    return this.dataService.getData();
    
  }

  disconnect() {
  }

}

