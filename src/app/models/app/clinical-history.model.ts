export interface ClinicalHistoryModel {
  basalMetabolicRate?:number;
  bloodPressure?: number,
  boneMass?: number;
  breathingFrequency?: number,
  diastolic?:number;
  glucose?:number;
  hdlCholesterol?:number;
  heartRate?: number,
  height?:number;
  ice?: number;
  id?: number;
  imc?: number;
  isDiabetes?: boolean,
  isSmoke?: boolean,
  ldlCholesterol?: number;
  metabolicAge?: number;
  muscleMass?: number;
  neckCircumference?: number;
  percentageBodyFat?: number;
  percentageBodyWater?: number;
  percentageVisceralFat?: number;
  registeredAt?: string;
  systolic?: number;
  totalCholesterol?: number;
  waistCircumference?: number;
  weight?: number;
}
