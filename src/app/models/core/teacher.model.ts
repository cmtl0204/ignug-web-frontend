import {UserModel} from "@models/auth";
import {InformationTeacherModel} from "@models/core";

export interface TeacherModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  isVisible: boolean;
  informationTeacher: InformationTeacherModel;
  user: UserModel;
}
