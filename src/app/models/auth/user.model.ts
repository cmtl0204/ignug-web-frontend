import {RoleModel} from '@models/auth';
import {CatalogueModel} from '@models/core';

export interface UserModel {
  id: number;
  identificationType: CatalogueModel;
  identificationTypeId: number;
  sex: CatalogueModel;
  gender: CatalogueModel;
  ethnicOrigin: CatalogueModel;
  bloodType: CatalogueModel;
  bloodTypeId: number;
  maritalStatus: CatalogueModel;
  phones: CatalogueModel[];
  emails: CatalogueModel[];
  roles: RoleModel[];
  avatar: string;
  birthdate: string;
  email: string;
  lastname: string;
  name: string;
  password: string;
  phone: string;
  suspended: boolean;
  username: string;
}

export interface CreateUserDto extends Omit<UserModel, 'id'> {
}

export interface UpdateUserDto extends Partial<Omit<UserModel, 'id'>> {
}
