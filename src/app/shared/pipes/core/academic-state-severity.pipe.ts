import {Pipe, PipeTransform} from '@angular/core';
import {CatalogueModel} from "@models/core";

@Pipe({
  name: 'academicStateSeverity'
})
export class AcademicStateSeverityPipe implements PipeTransform {

  transform(value: string = ''): string {
    return value === 'a' ? 'success' : value === 'r' ? 'danger' : 'warning';
  }

}
