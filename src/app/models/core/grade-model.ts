import { PartialModel } from './partial.modet';
import { EnrollmentDetailModel } from './enrollment-Detail.modet';

export interface GradeModel {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  enrollmentDetailModel:EnrollmentDetailModel
  partial: PartialModel;
  value: number;
}

export interface CreateGradeDto extends Omit<GradeModel, 'id'> {}

export interface UpdateGradeDto extends Partial<Omit<GradeModel, 'id'>> {}

export interface SelectGradeDto extends Partial<GradeModel> {}
