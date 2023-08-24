import { CatalogueModel, CareerModel, TeacherModel, SchoolPeriodModel, SubjectModel} from '@models/core';

export interface TeacherDistributiveModel {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  parallel: CatalogueModel;
  teacher: TeacherModel;
  schoolPeriod: SchoolPeriodModel;
  subject: SubjectModel;
  workday: CatalogueModel;
  career: CareerModel;

  hours: number;
}

export interface CreateTeacherDistributiveDto extends Omit<TeacherDistributiveModel, 'id'> {}

export interface UpdateTeacherDistributiveDto extends Partial<Omit<TeacherDistributiveModel, 'id'>> {}

export interface SelectTeacherDistributiveDto extends Partial<TeacherDistributiveModel> {}