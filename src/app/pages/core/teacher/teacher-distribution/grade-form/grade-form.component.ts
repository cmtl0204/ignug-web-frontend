import {Component, Input, OnInit} from '@angular/core';
import {CareerModel, EnrollmentDetailModel, GradeModel} from "@models/core";
import {PrimeIcons} from 'primeng/api';
import {SkeletonEnum} from "@shared/enums";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CoreService, GradesHttpService, MessageService} from "@services/core";

@Component({
  selector: 'app-grade-form',
  templateUrl: './grade-form.component.html',
  styleUrls: ['./grade-form.component.scss']
})
export class GradeFormComponent implements OnInit {
  @Input() enrollmentDetail!: EnrollmentDetailModel;
  protected form: FormGroup;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons;
  protected formErrors: string[] = [];

  constructor(public coreService: CoreService,
              private formBuilder: FormBuilder,
              private gradesHttpServices: GradesHttpService,
              public messageService: MessageService,
  ) {
    this.form = this.newForm;
  }

  ngOnInit(): void {
    console.log(this.enrollmentDetail);
  }

  onSubmit(): void {
    if (this.validateForm) {
      // if (this.id) {
      //   this.update(this.form.value);
      // } else {
      //   this.create(this.form.value);
      // }
    } else {
      this.form.markAllAsTouched();
      this.messageService.errorsFields(this.formErrors);
    }
  }

  create(item: GradeModel): void {
    this.gradesHttpServices.create(item).subscribe(() => {
      this.form.reset();
      //this.back();
    });
  }

  update(item: GradeModel): void {
    this.gradesHttpServices.update('', item).subscribe(() => {
      this.form.reset();
      // this.back();
    });
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      grade1: [null, []],
      grade2: [null, []],
      grade3: [null, []],
      grade4: [null, []]
    });
  }

  get validateForm() {
    this.formErrors = [];

    if (this.grade1Field.errors) this.formErrors.push('Parcial 1');
    if (this.grade2Field.errors) this.formErrors.push('Parcial 2');
    if (this.grade3Field.errors) this.formErrors.push('Parcial 3');
    if (this.grade4Field.errors) this.formErrors.push('Parcial 4');

    this.formErrors.sort();
    return this.formErrors.length === 0 && this.form.valid;
  }

  get grade1Field(): AbstractControl {
    return this.form.controls['grade1'];
  }

  get grade2Field(): AbstractControl {
    return this.form.controls['grade2'];
  }

  get grade3Field(): AbstractControl {
    return this.form.controls['grade3'];
  }

  get grade4Field(): AbstractControl {
    return this.form.controls['grade4'];
  }
}
