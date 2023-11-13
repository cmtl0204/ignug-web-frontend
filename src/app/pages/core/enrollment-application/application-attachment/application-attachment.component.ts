import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CataloguesHttpService, EnrollmentsHttpService, StudentsHttpService, SubjectsService} from "@services/core";
import {CatalogueModel, EnrollmentModel, FileModel} from "@models/core";
import {CatalogueEnrollmentStateEnum, CatalogueTypeEnum} from "@shared/enums";
import {AuthService} from "@services/auth";
import {PrimeIcons} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-application-attachment',
  templateUrl: './application-attachment.component.html',
  styleUrls: ['./application-attachment.component.scss']
})
export class ApplicationAttachmentComponent implements OnInit {
  @Output() previousOut: EventEmitter<number> = new EventEmitter<number>();
  protected readonly PrimeIcons = PrimeIcons;
// Flag upload files is enabled
  protected isFileList: boolean = false;
  protected isFileListEnabled: boolean = false;
  protected fileTypes: CatalogueModel[] = [];
  protected enrollment!: EnrollmentModel;
  protected files: FileModel[] = [];
  protected form: FormGroup;

  constructor(protected readonly subjectsService: SubjectsService,
              private readonly authService: AuthService,
              private readonly formBuilder: FormBuilder,
              private readonly enrollmentsHttpService: EnrollmentsHttpService,
              private readonly studentsHttpService: StudentsHttpService,
              private readonly cataloguesHttpService: CataloguesHttpService,) {
    this.form = this.newForm;
  }

  ngOnInit(): void {
    this.loadFileTypes();
    this.findEnrollmentByStudent();
  }

  get newForm() {
    return this.formBuilder.group({
      isIdentification: [false, [Validators.requiredTrue]],
      isSocioeconomicForm: [false, [Validators.requiredTrue]],
      isApplication: [false, [Validators.requiredTrue]],
      isPayment: [false],
    })
  }

  findEnrollmentByStudent() {
    this.studentsHttpService.findEnrollmentByStudent(this.authService.auth.student.id).subscribe(enrollment => {
      this.enrollment = enrollment;
      console.log(enrollment);
      this.isFileListEnabled = this.enrollment?.enrollmentStates.some(enrollmentState =>
        enrollmentState.state.code === CatalogueEnrollmentStateEnum.REGISTERED
      );
    })
  }

  loadFileTypes(): void {
    this.fileTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.DISABILITY_TYPE);
  }

  validateFiles(files: any) {
    this.files = files;
    this.isIdentificationField.patchValue(this.files.some(file => file.type?.code === '1'));
    this.isSocioeconomicFormField.patchValue(this.files.some(file => file.type?.code === '2'));
    this.isApplicationField.patchValue(this.files.some(file => file.type?.code === '3'));
    this.isPaymentField.patchValue(this.files.some(file => file.type?.code === '4'));
  }

  sendRequest() {
    this.enrollmentsHttpService.sendRequest(this.enrollment.id, null).subscribe(() => {
      this.findEnrollmentByStudent();
    });
  }

  previous() {
    this.previousOut.emit(-1);
  }

  get isIdentificationField() {
    return this.form.controls['isIdentification'];
  }

  get isSocioeconomicFormField() {
    return this.form.controls['isSocioeconomicForm'];
  }

  get isApplicationField() {
    return this.form.controls['isApplication'];
  }

  get isPaymentField() {
    return this.form.controls['isPayment'];
  }
}
