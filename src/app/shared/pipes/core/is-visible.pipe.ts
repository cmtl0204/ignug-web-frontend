import {Pipe, PipeTransform} from '@angular/core';
import {CatalogueCoreSchoolPeriodStateEnum} from "@shared/enums";

@Pipe({
  name: 'isVisible'
})
export class IsVisiblePipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Es Visible' : 'Oculto';
  }

}
