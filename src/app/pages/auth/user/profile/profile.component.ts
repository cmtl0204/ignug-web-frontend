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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnExitInterface {
  dateFormat = new DateFormatPipe();
  id: number = 0;
  bloodTypes: CatalogueModel[] = [];
  ethnicOrigins: CatalogueModel[] = [];
  emailVerifiedAt: Date | null = null;
  genders: CatalogueModel[] = [];
  identificationTypes: CatalogueModel[] = [];
  formUser: FormGroup = this.newUserForm;
  formProfile: FormGroup = this.newProfileForm;
  isLoadingSkeleton: boolean = false;
  loaded$ = this.coreService.loaded$;
  maritalStatus: CatalogueModel[] = [];
  sexes: CatalogueModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private authHttpService: AuthHttpService,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    private coreService: CoreService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Profile'}
    ]);
    if (this.authService.auth) {
      this.id = this.authService.auth.id;
    }
  }

  async onExit(): Promise<boolean> {
    if (this.formUser.touched || this.formUser.dirty || this.formProfile.touched || this.formProfile.dirty) {
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

    if (this.id > 0) {
      this.getProfile();
      this.getUserInformation();
    } else {
      //Todo: Revisar para el perfil, que mas se puede implementar
    }
  }

  get newUserForm(): FormGroup {
    return this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      phone: [null, []],
      // roles: [['admin'], []],
      username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });
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
    this.birthdateField.setValue(this.dateFormat.transform(this.birthdateField.getRawValue()));
    if (this.formProfile.valid) {
      if (this.id > 0) {
        this.updateProfile(this.formProfile.getRawValue());
      }
    } else {
      this.formProfile.markAllAsTouched();
    }
  }

  onSubmitUserInformation(): void {
    if (this.formUser.valid) {
      if (this.id > 0) {
        this.updateUserInformation(this.formUser.getRawValue());
      }
    } else {
      this.formUser.markAllAsTouched();
    }
  }

  getProfile(): void {
    this.isLoadingSkeleton = true;
    this.authHttpService.getProfile(this.id).subscribe((user) => {
        this.isLoadingSkeleton = false;
        this.formProfile.patchValue(user);
      }
    );
  }

  getUserInformation(): void {
    this.authHttpService.getUserInformation(this.id).subscribe((user) => {
        this.formUser.patchValue(user);
        this.emailVerifiedAt = user.emailVerifiedAt;
      }
    );
  }

  loadBloodTypes(): void {
    this.cataloguesHttpService.catalogue().subscribe((bloodTypes) => this.bloodTypes = bloodTypes);
  }

  loadEthnicOrigins(): void {
    this.cataloguesHttpService.catalogue().subscribe((ethnicOrigins) => this.ethnicOrigins = ethnicOrigins);
  }

  loadGenders(): void {
    this.cataloguesHttpService.catalogue().subscribe((genders) => this.genders = genders);
  }

  loadIdentificationTypes(): void {
    this.cataloguesHttpService.catalogue().subscribe((identificationTypes) =>
      this.identificationTypes = identificationTypes
    );
  }

  loadMaritalStatus(): void {
    this.cataloguesHttpService.catalogue().subscribe((maritalStatus) => this.maritalStatus = maritalStatus);
  }

  loadSexes(): void {
    this.cataloguesHttpService.catalogue().subscribe((sexes) => this.sexes = sexes);
  }

  updateProfile(user: UpdateUserDto): void {
    this.authHttpService.updateProfile(this.id, user).subscribe((user) => {
      this.formProfile.reset(user);
      this.birthdateField.setValue(new Date(this.birthdateField.value));
    });
  }

  updateUserInformation(user: UpdateUserDto): void {
    this.authHttpService.updateUserInformation(this.id, user).subscribe((user) => {
      this.formUser.reset(user);
      this.authService.auth = user;
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

  get emailField(): AbstractControl {
    return this.formUser.controls['email'];
  }

  get phoneField(): AbstractControl {
    return this.formUser.controls['phone'];
  }

  get usernameField(): AbstractControl {
    return this.formUser.controls['username'];
  }
}
