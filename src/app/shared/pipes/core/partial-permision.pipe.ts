import {Pipe, PipeTransform} from '@angular/core';
import {CatalogueModel} from "@models/core";

@Pipe({
  name: 'partialPermission'
})
export class PartialPermissionPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'HABILITADO' : 'BLOQUEADO';
  }

}
