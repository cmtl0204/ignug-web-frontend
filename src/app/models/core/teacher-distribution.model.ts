import {
  CatalogueModel,
  CareerModel,
  TeacherModel,
  SchoolPeriodModel,
  SubjectModel,
  PartialPermissionModel
} from '@models/core';

export interface TeacherDistributionModel {
  id: string;
  parallel: CatalogueModel;
  teacher: TeacherModel;
  schoolPeriod: SchoolPeriodModel;
  subject: SubjectModel;
  workday: CatalogueModel;
  hours: number;
  partialPermissions: PartialPermissionModel[];
}

export interface CreateTeacherDistributionDto extends Omit<TeacherDistributionModel, 'id'> {
}

export interface UpdateTeacherDistributionDto extends Partial<Omit<TeacherDistributionModel, 'id'>> {
}

export interface SelectTeacherDistributionDto extends Partial<TeacherDistributionModel> {
}
