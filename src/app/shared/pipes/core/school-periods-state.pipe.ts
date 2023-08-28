import {Pipe, PipeTransform} from '@angular/core';
import {CatalogueCoreSchoolPeriodStateEnum} from "@shared/enums";

@Pipe({
  name: 'schoolPeriodsState'
})
export class SchoolPeriodsStatePipe implements PipeTransform {

  transform(value: string): string {
    return value === CatalogueCoreSchoolPeriodStateEnum.OPEN ? 'info' : 'warning';
  }

}
