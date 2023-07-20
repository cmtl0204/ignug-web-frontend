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

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnExitInterface {
  protected dateFormat = new DateFormatPipe();
  protected bloodTypes: CatalogueModel[] = [];
  protected ethnicOrigins: CatalogueModel[] = [];
  protected genders: CatalogueModel[] = [];
  protected identificationTypes: CatalogueModel[] = [];
  protected formProfile: FormGroup;
  protected isLoadingSkeleton: boolean = false;
  protected isLoading: boolean = false;
  protected maritalStatus: CatalogueModel[] = [];
  protected sexes: CatalogueModel[] = [];

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
    this.formProfile = this.newProfileForm;
  }

  async onExit(): Promise<boolean> {
    if (this.formProfile.touched || this.formProfile.dirty) {
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

  get newProfileForm(): FormGroup {
    return this.formBuilder.group({
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

    if (this.formProfile.valid) {
      this.updateProfile(this.formProfile.value);
    } else {
      this.formProfile.markAllAsTouched();
      this.messageService.errorsFields.then();
    }
  }

  getProfile(): void {
    this.isLoadingSkeleton = true;
    this.authHttpService.getProfile().subscribe((user) => {
        this.isLoadingSkeleton = false;
        this.formProfile.patchValue(user);
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
      this.formProfile.reset(user);
      if (this.birthdateField.value)
        this.birthdateField.setValue(new Date(this.birthdateField.value));
    });
  }

  get bloodTypeField(): AbstractControl {
    return this.formProfile.controls['bloodType'];
  }

  get birthdateField(): AbstractControl {
    return this.formProfile.controls['birthdate'];
  }

  get ethnicOriginField(): AbstractControl {
    return this.formProfile.controls['ethnicOrigin'];
  }

  get genderField(): AbstractControl {
    return this.formProfile.controls['gender'];
  }

  get identificationField(): AbstractControl {
    return this.formProfile.controls['identification'];
  }

  get identificationTypeField(): AbstractControl {
    return this.formProfile.controls['identificationType'];
  }

  get lastnameField(): AbstractControl {
    return this.formProfile.controls['lastname'];
  }

  get maritalStatusField(): AbstractControl {
    return this.formProfile.controls['maritalStatus'];
  }

  get nameField(): AbstractControl {
    return this.formProfile.controls['name'];
  }

  get sexField(): AbstractControl {
    return this.formProfile.controls['sex'];
  }
}
