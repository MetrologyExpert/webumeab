import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'measurementUnit'
})
export class MeasurementUnitPipe implements PipeTransform {

  transform(value: number, args?: string): any {
    if (!value) 
      return null;

      return value + ' ' +args;}

}
