import {CatalogueModel, SubjectModel} from "@models/core";
import {EnrollmentDetailModule} from "../../pages/core/enrollment-detail/enrollment-detail.module";
import {EnrollmentStateModel} from "@models/core/enrollment-state.model";

export interface EnrollmentModel {
  id: string;
  createAt: Date;
  updateAt: Date;
  deleteAt: Date;
  isVisible: boolean;

  academicState:CatalogueModel;
  enrollmentDetails: EnrollmentDetailModule[];
  enrollmentStates: EnrollmentStateModel[];
  parallel: CatalogueModel;
  state: CatalogueModel;
  subject: SubjectModel;
  type: CatalogueModel;
  workday: CatalogueModel;

  number: number;
  date: Date;
  finalAttendance: number;
  finalGrade: number;
  observation: string;
}
export interface CreateEnrollmentDto extends Omit<EnrollmentModel, 'id'> {
}

export interface UpdateEnrollmentDto extends Partial<Omit<EnrollmentModel, 'id'>> {
}

export interface SelectEnrollmentDto extends Partial<EnrollmentModel> {
}
