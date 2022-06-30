import {CatalogueModel, TreatmentOptionModel} from "@models/app";
import {ProductModel} from "@models/app/product.model";

export interface TreatmentDetailModel {
  id?: number
  product?: ProductModel;
  type?: CatalogueModel;
  treatmentOptions?: TreatmentOptionModel[];
  quantity?: string;
  unit?: string;
  timeStartedAt?: Date;
}
