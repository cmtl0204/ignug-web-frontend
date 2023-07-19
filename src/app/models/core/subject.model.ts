import {RoleModel} from '@models/auth';
import { CatalogueModel, CurriculumModel } from '@models/core';


export interface SubjectModel {
  id: string;
  createAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  academicPeriod: CatalogueModel;
  curriculum:CurriculumModel;
  type: CatalogueModel;
  state: CatalogueModel;

  autonomousHour: number;
  code: string;
  credit: number;
  name: string;
  practicalHour: number;
  scale: number;
  teacherHour: number;
  isVisible: boolean;
}

export interface CreateSubjectDto extends Omit<SubjectModel, 'id'> {
}

export interface UpdateSubjectDto extends Partial<Omit<SubjectModel, 'id'>> {
}

export interface SelectSubjectDto extends Partial<SubjectModel> {
}
