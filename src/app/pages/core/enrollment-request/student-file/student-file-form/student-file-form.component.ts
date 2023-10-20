import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PrimeIcons, MenuItem} from "primeng/api";
import {OnExitInterface} from "@shared/interfaces";
import {CatalogueModel, StudentModel} from "@models/core";
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  MessageService,
  RoutesService,
  StudentsHttpService
} from "@services/core";
import {BreadcrumbEnum, CatalogueCoreTypeEnum, SkeletonEnum} from '@shared/enums';

@Component({
  selector: 'app-student-file-form',
  templateUrl: './student-file-form.component.html',
  styleUrls: ['./student-file-form.component.scss']
})
export class StudentFileFormComponent implements OnInit, OnExitInterface {
  protected disabilityTypes: CatalogueModel[] = [];

  protected readonly PrimeIcons = PrimeIcons;
  protected id: string | null = null;
  protected form: FormGroup;
  items: MenuItem[]=[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    protected messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private studentsHttpService: StudentsHttpService
  ) {

    
    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
    }

    this.form = this.newForm;
  }

  async onExit(): Promise<boolean> {
    if (this.form.touched || this.form.dirty) {
      return await this.messageService.questionOnExit().then(result => result.isConfirmed);
    }
    return true;
  }

  ngOnInit(): void {

    if (this.id) {
      this.get();
    }    

    this.loadIsDisabilities();
  }



  get newForm(): FormGroup {
    return this.formBuilder.group({
      informationStudent: this.informationStudentForm,
    });
  }

  get informationStudentForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      disabilityType: [null, [Validators.required]],
    });
  }

  loadIsDisabilities(): void {
    this.disabilityTypes = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.YES_NO
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.id) {
        this.update(this.form.value);
      } else {
        this.create(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
      this.messageService.errorsFields();
    }
  }

  back(): void {
    this.router.navigate([this.routesService.students]);
  }

  /** Actions **/
  create(student: StudentModel): void {
    this.studentsHttpService.create(student).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  update(student: StudentModel): void {
    this.studentsHttpService.update(this.id!, student).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  /** Load Data **/
  get(): void {
    this.studentsHttpService.findOne(this.id!).subscribe((student) => {
      this.form.patchValue(student);
    });
  }

  activeIndex: number = 0;

  next(){
    this.activeIndex++
  }

  previus(){
    this.activeIndex--
  }
  get aditionalField(): FormGroup {
    return this.form.controls['informationStudent'] as FormGroup;
  }
  
  get disabilityTypeField(): AbstractControl {
    return this.aditionalField.controls['disabilityType'];
  }

  protected readonly SkeletonEnum = SkeletonEnum;
}
