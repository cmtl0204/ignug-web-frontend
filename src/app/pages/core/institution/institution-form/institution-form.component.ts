import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  AbstractControl,
  FormArray, FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateInstitutionDto, UpdateInstitutionDto} from '@models/core';
import {} from '@services/core';
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  InstitutionsHttpService,
  MessageService
} from '@services/core';
import {OnExitInterface} from '@shared/interfaces';
import {PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-institution-form',
  templateUrl: './institution-form.component.html',
  styleUrls: ['./institution-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InstitutionFormComponent {
}

