import {PartialModel, TeacherDistributionModel} from '@models/core';

export interface PartialPermissionModel {
  id: string;
  teacherDistribution: TeacherDistributionModel;
  partial: PartialModel;
  enabled: boolean;
}
