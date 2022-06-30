import {RoleModel} from '@models/auth';
import {CatalogueModel} from '@models/app';

export interface UserModel {
  id?: number;
  age?: number;
  identificationType?: CatalogueModel;
  sex?: CatalogueModel;
  gender?: CatalogueModel;
  ethnicOrigin?: CatalogueModel;
  bloodType?: CatalogueModel;
  civilStatus?: CatalogueModel;
  phones?: CatalogueModel[];
  emails?: CatalogueModel[];
  roles?: RoleModel[];
  avatar?: string;
  birthdate?: string;
  email?: string;
  lastname?: string;
  name?: string;
  phone?: string;
  suspended?: boolean;
  username?: string;
}
