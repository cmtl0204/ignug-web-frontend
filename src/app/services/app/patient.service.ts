import {Injectable} from '@angular/core';
import {PatientModel} from "@models/app";

@Injectable({
  providedIn: 'root'
})

export class PatientService {
  private patient: PatientModel = {};

  constructor() {
  }

  get selectedPatient(): PatientModel {
    return this.patient;
  }

  set selectedPatient(patient: PatientModel) {
    this.patient = patient;
  }

}
