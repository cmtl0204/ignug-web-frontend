import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {UpdateUserDto} from '@models/auth';
import {CatalogueModel} from '@models/core';
import {AuthHttpService, AuthService} from '@services/auth';
import {BreadcrumbService, CataloguesHttpService, CoreService, MessageService} from '@services/core';
import {OnExitInterface} from '@shared/interfaces';
import {DateValidators} from '@shared/validators';
import {DateFormatPipe} from "@shared/pipes";
import {CatalogueCoreTypeEnum} from "@shared/enums";
import {environment} from "@env/environment.prod";
import {PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnExitInterface {
  protected readonly PrimeIcons = PrimeIcons;
  protected dateFormat = new DateFormatPipe();
  protected bloodTypes: CatalogueModel[] = [];
  protected ethnicOrigins: CatalogueModel[] = [];
  protected genders: CatalogueModel[] = [];
  protected identificationTypes: CatalogueModel[] = [];
  protected form: FormGroup;
  protected isLoadingSkeleton: boolean = false;
  protected isLoading: boolean = false;
  protected maritalStatus: CatalogueModel[] = [];
  protected sexes: CatalogueModel[] = [];
  protected HOST_URL: string = environment.HOST_URL;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private authHttpService: AuthHttpService,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    private coreService: CoreService,
    private formBuilder: FormBuilder,
    public messageService: MessageService,
  ) {
    this.form = this.newForm;
  }

  async onExit(): Promise<boolean> {
    if (this.form.touched || this.form.dirty) {
      return await this.messageService.questionOnExit().then(result => result.isConfirmed);
    }
    return true;
  }

  ngOnInit(): void {
    this.loadBloodTypes();
    this.loadEthnicOrigins();
    this.loadGenders();
    this.loadIdentificationTypes();
    this.loadMaritalStatus();
    this.loadSexes();
    this.getProfile();
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      avatar: [null],
      birthdate: [null, [DateValidators.max(new Date())]],
      bloodType: [null, []],
      ethnicOrigin: [null, []],
      gender: [null, []],
      identification: [null, [Validators.required]],
      identificationType: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      maritalStatus: [null, []],
      name: [null, [Validators.required]],
      sex: [null, []],
    });
  }

  onSubmitProfile(): void {
    if (this.birthdateField.value)
      this.birthdateField.setValue(this.dateFormat.transform(this.birthdateField.value));

    if (this.form.valid) {
      this.updateProfile(this.form.value);
    } else {
      this.form.markAllAsTouched();
      this.messageService.errorsFields.then();
    }
  }

  getProfile(): void {
    this.isLoadingSkeleton = true;
    this.authHttpService.getProfile().subscribe((user) => {
        this.isLoadingSkeleton = false;
        this.form.patchValue(user);
      }
    );
  }

  loadBloodTypes(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.BLOOD_TYPE).subscribe((bloodTypes) => this.bloodTypes = bloodTypes);
  }

  loadEthnicOrigins(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.ETHNIC_ORIGIN).subscribe((ethnicOrigins) => this.ethnicOrigins = ethnicOrigins);
  }

  loadGenders(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.GENDER).subscribe((genders) => this.genders = genders);
  }

  loadIdentificationTypes(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.IDENTIFICATION_TYPE).subscribe((identificationTypes) =>
      this.identificationTypes = identificationTypes
    );
  }

  loadMaritalStatus(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.MARITAL_STATUS).subscribe((maritalStatus) => this.maritalStatus = maritalStatus);
  }

  loadSexes(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.SEX).subscribe((sexes) => this.sexes = sexes);
  }

  updateProfile(user: UpdateUserDto): void {
    this.authHttpService.updateProfile(user).subscribe((user) => {
      this.form.reset(user);
      if (this.birthdateField.value)
        this.birthdateField.setValue(new Date(this.birthdateField.value));
    });
  }

  uploadAvatar(event: any, uploadFiles: any) {
    const formData = new FormData();
    formData.append('avatar', event.files[0]);
    this.authHttpService.uploadAvatar(this.idField.value, formData).subscribe(response => {
      uploadFiles.clear();
      this.getProfile();
    }, error => uploadFiles.clear());
  }

  get idField(): AbstractControl {
    return this.form.controls['id'];
  }

  get avatarField(): AbstractControl {
    return this.form.controls['avatar'];
  }

  get bloodTypeField(): AbstractControl {
    return this.form.controls['bloodType'];
  }

  get birthdateField(): AbstractControl {
    return this.form.controls['birthdate'];
  }

  get ethnicOriginField(): AbstractControl {
    return this.form.controls['ethnicOrigin'];
  }

  get genderField(): AbstractControl {
    return this.form.controls['gender'];
  }

  get identificationField(): AbstractControl {
    return this.form.controls['identification'];
  }

  get identificationTypeField(): AbstractControl {
    return this.form.controls['identificationType'];
  }

  get lastnameField(): AbstractControl {
    return this.form.controls['lastname'];
  }

  get maritalStatusField(): AbstractControl {
    return this.form.controls['maritalStatus'];
  }

  get nameField(): AbstractControl {
    return this.form.controls['name'];
  }

  get sexField(): AbstractControl {
    return this.form.controls['sex'];
  }
}
