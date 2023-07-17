import {CatalogueModel, CurriculumModel} from '@models/core';

export interface SubjectModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  isVisible: boolean;

  academicPeriod: CatalogueModel;
  curriculum: CurriculumModel;
  state: CatalogueModel;
  type: CatalogueModel;

  autonomousHour: number;
  code: string;
  credits: number;
  name: string;
  practicalHour: number;
  scale: number;
  teacherHour: number;
}

export interface CreateSubjectDto extends Omit<SubjectModel, 'id'> {
}

export interface UpdateSubjectDto extends Partial<Omit<SubjectModel, 'id'>> {
}

export interface SelectSubjectDto extends Partial<SubjectModel> {
}
