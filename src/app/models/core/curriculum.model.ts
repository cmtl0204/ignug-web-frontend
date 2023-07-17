import {CareerModel,CatalogueModel} from "@models/core";

export interface CurriculumModel {
  id: number;
  createAt: Date;
  updateAt: Date;
  deleteAt: Date;
  isVisible: boolean;

  career:CareerModel;
  state:CatalogueModel;

  code: string;
  name: string;
  description: string;
  resolutionNumber: string;
  periodicAcademicNumber: number;
  weeksNumber: number;
}
