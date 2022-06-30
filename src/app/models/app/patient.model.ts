import {CatalogueModel} from '@models/app';
import {UserModel,} from '@models/auth';

export interface PatientModel {
  id?: number;
  user?:UserModel,
  gender?: CatalogueModel,
  name?: string,
  lastname?: string,
  email?: string,
  phone?: string,
  birthdate?: Date,
  age?:number,
  sector?:CatalogueModel,
}
