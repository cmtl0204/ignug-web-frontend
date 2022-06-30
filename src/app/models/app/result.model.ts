import { ResultInterpretationModels } from "@models/app"

export interface ResultModel{
    bodyFat? :  ResultInterpretationModels,
    boneMass? : ResultInterpretationModels,
    breathingFrequency? :  ResultInterpretationModels,
    diastolic? :  ResultInterpretationModels,
    glucose? :  ResultInterpretationModels,
    hdlCholesterol? :  ResultInterpretationModels,
    heartRate ? :  ResultInterpretationModels,
    ice? : ResultInterpretationModels,
    isNew? : boolean,
    ldlCholesterol?: ResultInterpretationModels,
    muscleMass?: ResultInterpretationModels,
    neckCircumference?: ResultInterpretationModels,
    percentageBodyWater? : ResultInterpretationModels,
    percentageVisceralFat? : ResultInterpretationModels,
    risk? : ResultInterpretationModels,
    systolic? : ResultInterpretationModels,
    totalCholesterol? : ResultInterpretationModels,
    registeredAt?: Date,
}
