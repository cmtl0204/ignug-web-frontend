import {PermissionModel, RoleModel,UserModel} from '@models/auth';

export interface LoginResponse {
  data: Data;
  message: string;
  token: string;
}

interface Data {
  roles: RoleModel[];
  permissions: PermissionModel[];
  user: UserModel;
}
