import {Pipe, PipeTransform} from '@angular/core';
import {CatalogueModel} from "@models/core";
import {CatalogueCoreEnrollmentStateEnum} from "@shared/enums";

@Pipe({
  name: 'enrollmentState'
})
export class EnrollmentStatePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case CatalogueCoreEnrollmentStateEnum.REGISTERED:
        return 'warning';
      case CatalogueCoreEnrollmentStateEnum.REQUEST_SENT:
        return 'info';
      case CatalogueCoreEnrollmentStateEnum.APPROVED:
        return '';
      case CatalogueCoreEnrollmentStateEnum.REJECTED:
        return 'danger';
      case CatalogueCoreEnrollmentStateEnum.ENROLLED:
        return 'success';
      default:
        return 'secondary'
    }
  }

}
