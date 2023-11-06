import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {
  CareersService,
  CoreService,
  CurriculumsHttpService,
  CurriculumsService,
  EnrollmentsHttpService,
  MessageService, StudentsHttpService, SubjectsService
} from "@services/core";
import {MenuItem, PrimeIcons} from 'primeng/api';
import {ColumnModel, SubjectModel, CurriculumModel, CareerModel, StudentModel} from '@models/core';
import {
  IdButtonActionEnum,
  LabelButtonActionEnum,
  IconButtonActionEnum,
  ClassButtonActionEnum
} from "@shared/enums";
import {AuthService} from "@services/auth";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {
  // Reference Prime Icons
  protected readonly PrimeIcons = PrimeIcons;

  // Button Actions Enum
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly ClassButtonActionEnum = ClassButtonActionEnum;

  protected buttonActions: MenuItem[] = [];

  // Columns of table
  protected columns: ColumnModel[] = this.buildColumns;

  // Flag actions buttons is enabled
  protected isButtonActions: boolean = false;

  // Flag upload files is enabled
  protected isFileList: boolean = false;

  // Administrator Data
  protected selectedItem!: SubjectModel;
  protected selectedItems: SubjectModel[] = [];
  protected items: SubjectModel[] = [];

  // Foreign Keys
  protected selectedCareer: FormControl = new FormControl();
  protected selectedCurriculum: FormControl = new FormControl();
  protected careers: CareerModel[] = [];
  protected curriculums: CurriculumModel[] = [];

  protected student!: StudentModel;
  protected totalCredits: number = 0;

  constructor(
    private readonly authService: AuthService,
    protected readonly coreService: CoreService,
    private readonly careersService: CareersService,
    private readonly curriculumsHttpService: CurriculumsHttpService,
    private readonly curriculumsService: CurriculumsService,
    private readonly subjectsService: SubjectsService,
    private readonly enrollmentsHttpService: EnrollmentsHttpService,
    private readonly studentsHttpService: StudentsHttpService,
    protected readonly messageService: MessageService,) {
    this.student = authService.auth.student;
    this.selectedItems = subjectsService.enrollmentSubjects;
    this.careers = this.careersService.careers;

    this.selectedCareer.patchValue(this.careersService.career);

    this.curriculums = this.careersService.career.curriculums;

    if (this.curriculums.length > 0) {
      this.selectedCurriculum.patchValue(this.curriculums[0]);
      this.curriculumsService.curriculum = this.curriculums[0];
      this.findSubjectsAllByCurriculum();
    }

    this.selectedCareer.valueChanges.subscribe(selectedCareer => {
      this.items = [];
      this.curriculumsService.curriculum = {};

      if (selectedCareer.curriculums.length > 0) {
        this.selectedCurriculum.patchValue(selectedCareer.curriculums[0]);
        this.curriculumsService.curriculum = selectedCareer.curriculums[0];
        this.curriculums = selectedCareer.curriculums;
        this.findSubjectsAllByCurriculum();
      }
    });
  }

  get buildColumns(): ColumnModel[] {
    return [
      {field: 'code', header: 'Código'},
      {field: 'name', header: 'Nombre'},
      {field: 'hours', header: 'Horas Doc. / Prac. / Aut.'},
      {field: 'academicPeriod', header: 'Periodo académico'},
      {field: 'state', header: 'Estado'}
    ];
  }

  get buildButtonActions() {
    return [
      {
        id: IdButtonActionEnum.UPDATE,
        label: LabelButtonActionEnum.UPDATE,
        icon: IconButtonActionEnum.UPDATE,
        command: () => {
          // if (this.selectedItem?.id) this.redirectEditForm(this.selectedItem.id);
        },
      },
      {
        id: IdButtonActionEnum.HIDE,
        label: LabelButtonActionEnum.HIDE,
        icon: IconButtonActionEnum.HIDE,
        command: () => {
          // if (this.selectedItem?.id) this.hide(this.selectedItem.id);
        },
      },
      {
        id: IdButtonActionEnum.REACTIVATE,
        label: LabelButtonActionEnum.REACTIVATE,
        icon: IconButtonActionEnum.REACTIVATE,
        command: () => {
          // if (this.selectedItem?.id) this.reactivate(this.selectedItem.id);
        },

      },
      {
        id: IdButtonActionEnum.FILE_LIST,
        label: LabelButtonActionEnum.FILE_LIST,
        icon: IconButtonActionEnum.FILE_LIST,
        command: () => {
          if (this.selectedItem?.id) this.isFileList = true;
        },

      }
    ];
  }

  /** Load Data **/
  findSubjectsAllByCurriculum() {
    this.curriculumsHttpService.findSubjectsAllByCurriculum(this.selectedCurriculum.value.id)
      .subscribe(subjects => {
        this.items = subjects.sort(function (a, b) {
          if (a.academicPeriod.code > b.academicPeriod.code) {
            return 1;
          }
          if (a.academicPeriod.code < b.academicPeriod.code) {
            return -1;
          }
          return 0;
        });
        this.findEnrollmentDetailByStudent();
      });
  }

  findEnrollmentDetailByStudent() {
    this.studentsHttpService.findEnrollmentDetailsByStudent(this.student.id)
      .subscribe(enrollmentDetails => {
        for (const item of this.items) {
          for (const enrollmentDetail of enrollmentDetails) {
            if (item.id === enrollmentDetail.subjectId) {
              item.academicState = enrollmentDetail.academicState?.code;
            }
          }
        }
        // this.items = subjects.sort(function (a, b) {
        //   if (a.academicPeriod.code > b.academicPeriod.code) {
        //     return 1;
        //   }
        //   if (a.academicPeriod.code < b.academicPeriod.code) {
        //     return -1;
        //   }
        //   return 0;
        // });
      });
  }

  /** Select **/
  selectItem(item: SubjectModel) {
    this.isButtonActions = true;
    this.selectedItem = item;
    // this.subjectsService.subject = item;
    // this.validateButtonActions(item);
  }

  selectItems() {
    console.log(this.selectedItems);
    this.totalCredits = this.selectedItems.reduce((accumulator, currentValue) => accumulator + currentValue.credits, 0);
    this.subjectsService.enrollmentSubjects = this.selectedItems;
  }
}
