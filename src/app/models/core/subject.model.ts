import {RoleModel} from '@models/auth';
import {CatalogueModel} from '@models/core';


export interface SubjectModel {
  id: string;
  createAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  academicPeriod: CatalogueModel;
  //urriculum:CurriculumModel;
  autonomousHour: number;
  code: string;
  credit: number;
  name: string;
  practicalHour: number;
  scale: number;
  teacherHour: number;
  state: boolean;
}

export interface CreateSubjectDto extends Omit<SubjectModel, 'id'> {
}

export interface UpdateSubjectDto extends Partial<Omit<SubjectModel, 'id'>> {
}

export interface SelectSubjectDto extends Partial<SubjectModel> {
}
