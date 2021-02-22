import { DataSource } from '@angular/cdk/collections';
import { InstrumentService } from './../instrument.service';
import { Component, OnInit } from '@angular/core';
import { Instrument } from '../model/instrument.model';
import { Observable } from 'rxjs/internal/Observable';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';

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


  data$=this.dataService.getData();

  connect(): Observable<Instrument[]> {

    const dataMutations = 
      observableOf(this.data$,
      this.paginator.page,
      this.sort.sortChange)
    ;

    return merge(dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData(this.dataService.ELEMENT_DATA));
    }));

  } 

  disconnect() {
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Instrument[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Instrument[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


