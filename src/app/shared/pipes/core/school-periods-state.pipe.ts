import {Pipe, PipeTransform} from '@angular/core';
import {SchoolPeriodsStateEnum} from "@shared/enums";

@Pipe({
  name: 'schoolPeriodsState'
})
export class SchoolPeriodsStatePipe implements PipeTransform {

  transform(value: string): string {
    return value === SchoolPeriodsStateEnum.OPEN ? 'info' : 'warning';
  }

}
