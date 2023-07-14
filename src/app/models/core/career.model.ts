import {RoleModel} from '@models/auth';
import {CatalogueModel} from '@models/core';

export interface CareerModel {
  id: string;
  identificationType: CatalogueModel;
  identificationTypeId: CatalogueModel;
  sex: CatalogueModel;
  gender: CatalogueModel;
  ethnicOrigin: CatalogueModel;
  bloodType: CatalogueModel;
  bloodTypeId: CatalogueModel;
  maritalStatus: CatalogueModel;
  phones: CatalogueModel[];
  emails: CatalogueModel[];
  roles: RoleModel[];
  avatar: string;
  birthdate: string;
  email: string;
  emailVerifiedAt: Date;
  lastname: string;
  maxAttempts: number;
  name: string;
  password: string;
  passwordChanged: boolean;
  phone: string;
  suspendedAt: Date;
  username: string;
}

export interface CreateCareerDto extends Omit<CareerModel, 'id'> {
}

export interface UpdateCareerDto extends Partial<Omit<CareerModel, 'id'>> {
}

export interface SelectCareerDto extends Partial<CareerModel> {
}
