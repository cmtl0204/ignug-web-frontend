import {PermissionModel} from './permission.model';

export interface RoleModel {
  id?: string;
  name?: string;
  code?: string;
  permissions?: PermissionModel[];
}
