import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  AbstractControl,
  FormArray, FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateCurriculumDto, UpdateCurriculumDto} from '@models/core';
import {AuthHttpService, AuthService, RolesHttpService,} from '@services/auth';
import {
  BreadcrumbService,
  CurriculumsHttpService,
  CataloguesHttpService,
  CoreService,
  MessageService
} from '@services/core';
import {OnExitInterface} from '@shared/interfaces';
import {PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-curriculum-form',
  templateUrl: './curriculum-form.component.html',
  styleUrls: ['./curriculum-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CurriculumFormComponent {
  
}
