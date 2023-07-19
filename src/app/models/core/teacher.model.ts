import { UserModel } from "@models/auth";
import { InformationTeacherModel } from "./info-teacher.model";

export interface TeacherModel{
  id?: string;
  informationTeacher?: InformationTeacherModel;
  user?: UserModel;
}