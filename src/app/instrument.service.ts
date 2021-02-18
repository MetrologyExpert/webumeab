import { Observable, of } from 'rxjs';
import { Instrument } from './model/instrument.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService
 {

  constructor() { }

  public ELEMENT_DATA: Instrument[] = [
    new Instrument(
       1, 
      'instrument 1', 
      'dimensional measurement', 
      'https://canary.contestimg.wish.com/api/webimage/5d031bae5244fb48cb3c95b3-normal.jpg?cache_buster=9fadf0a17f0d1cadaf7413c7635bc5c5'),
    new Instrument(
       2,
      'instrument 2', 
      'dimensional measurement', 
      'https://assets.machine-dro.co.uk/pub/media/catalog/product/cache/5116038ac561e6f6b561b4663c180b51/imp/ort/autoimg-Mitutoyo-External-103-137-1.jpg'),
  ];

getData(): Observable<Instrument[]> {
  return of<Instrument[]>(this.ELEMENT_DATA);
}

addInstrument(data) {
  this.ELEMENT_DATA.push(data);
}

deleteInstrument(index) {
  this.ELEMENT_DATA = [...this.ELEMENT_DATA.slice(0, index), ...this.ELEMENT_DATA.slice(index + 1)];
}

dataLength() {
  return this.ELEMENT_DATA.length;
}


}
