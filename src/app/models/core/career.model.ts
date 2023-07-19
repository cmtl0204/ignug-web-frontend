import { CatalogueModel, InstitutionModel } from '@models/core';
import { UserModel } from '@models/auth';

export interface CareerModel {
  id: string;
  createAt: Date;
  updateAt: Date;
  deleteAt: Date;
  isVisible: boolean;

  users: UserModel[];
  institution: InstitutionModel;
  modality: CatalogueModel;
  state: CatalogueModel;
  type: CatalogueModel;
  acronym: string;
  code: string;
  codeSniese: string;
  degree: string;
  logo: string;
  name: string;
  resolutionNumber: string;
  shortName: string;
}

export interface CreateCareerDto extends Omit<CareerModel, 'id'> {}

export interface UpdateCareerDto extends Partial<Omit<CareerModel, 'id'>> {}

export interface SelectCareerDto extends Partial<CareerModel> {}
