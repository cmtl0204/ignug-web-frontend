import {Pipe, PipeTransform} from '@angular/core';
import {CatalogueCoreSchoolPeriodStateEnum} from "@shared/enums";

@Pipe({
  name: 'selected'
})
export class SelecetedPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Seleccionado' : '';
  }

}
