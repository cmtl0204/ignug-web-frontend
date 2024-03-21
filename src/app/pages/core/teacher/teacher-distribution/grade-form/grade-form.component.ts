import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CareerModel, EnrollmentDetailModel, GradeModel} from "@models/core";
import {PrimeIcons} from 'primeng/api';
import {SkeletonEnum} from "@shared/enums";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CoreService, GradesHttpService, MessageService, TeacherDistributionsService} from "@services/core";

@Component({
  selector: 'app-grade-form',
  templateUrl: './grade-form.component.html',
  styleUrls: ['./grade-form.component.scss']
})
export class GradeFormComponent implements OnInit {
  @Input() enrollmentDetail!: EnrollmentDetailModel;
  @Output() isModalGrades = new EventEmitter<boolean>(true);
  protected form: FormGroup;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons;
  protected formErrors: string[] = [];

  constructor(public coreService: CoreService,
              private formBuilder: FormBuilder,
              private gradesHttpServices: GradesHttpService,
              public messageService: MessageService,
              protected readonly teacherDistributionsService: TeacherDistributionsService,
  ) {
    this.form = this.newForm;
  }

  ngOnInit(): void {
    const grade1 = this.enrollmentDetail.grades.find(grade => grade.partial.code === '1');
    const grade2 = this.enrollmentDetail.grades.find(grade => grade.partial.code === '2');
    const grade3 = this.enrollmentDetail.grades.find(grade => grade.partial.code === '3');
    const grade4 = this.enrollmentDetail.grades.find(grade => grade.partial.code === '4');

    if (grade1)
      this.grade1Field.patchValue(grade1.value);

    if (grade2)
      this.grade2Field.patchValue(grade2.value);

    if (grade3)
      this.grade3Field.patchValue(grade3.value);

    if (grade4)
      this.grade4Field.patchValue(grade4.value);

    this.attendanceField.patchValue(this.enrollmentDetail.finalAttendance);
  }

  onSubmit(): void {
    if (this.validateForm) {
      this.save();
    } else {
      this.form.markAllAsTouched();
      this.messageService.errorsFields(this.formErrors);
    }
  }

  save() {
    this.gradesHttpServices.saveGradesByTeacher(this.enrollmentDetail.id!, this.form.value).subscribe(() => {
      this.isModalGrades.emit(false);
    });
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      grade1: [null, []],
      grade2: [null, []],
      grade3: [null, []],
      grade4: [null, []],
      attendance: [null, []],
      teacherDistributionId: [this.teacherDistributionsService.teacherDistribution.id!, []],
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

  get attendanceField(): AbstractControl {
    return this.form.controls['attendance'];
  }
}
