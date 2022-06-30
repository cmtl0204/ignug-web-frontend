import {UserModel, PermissionModel, RoleModel} from '@models/auth';
import {PatientModel} from "@models/app";

export interface LoginResponse {
  data: Data;
  msg?: Msg;
  token?: string;
}

interface Msg {
  summary: string;
  detail: string;
  code: string;
}

interface Data {
  roles: RoleModel[];
  permissions: PermissionModel[];
  user: UserModel;
  patient?: PatientModel;
}
