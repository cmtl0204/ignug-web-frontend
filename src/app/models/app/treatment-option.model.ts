import {ProductModel} from '@models/app/product.model';
import {TreatmentModel} from'@models/app';

export interface TreatmentOptionModel {
  id?: number
  product?: ProductModel;
  treatment?: TreatmentModel;
}
