import {PatientModel} from "@models/app";

export interface TreatmentModel {
  id?: number;
  patient?: PatientModel;
  additionalInformation?: string[];
  endedAt?: Date;
  published?: boolean;
  startedAt?: Date;
  timeStartedAt?: Date;
}
