export enum CatalogueTypeEnum {
  ACADEMIC_PERIOD = 'ACADEMIC_PERIOD',
  ANCESTRAL_LANGUAGE_NAME = 'ANCESTRAL_LANGUAGE_NAME',
  BLOOD_TYPE = 'BLOOD_TYPE',
  CAREER_MODALITY = 'CAREER_MODALITY',
  CAREERS_STATE = 'CAREERS_STATE',
  CAREERS_TYPE = 'CAREERS_TYPE',
  CLASSROOMS_STATE = 'CLASSROOMS_STATE',
  CLASSROOMS_TYPE = 'CLASSROOMS_TYPE',
  CHILDREN_TOTAL = 'CHILDREN_TOTAL',
  CONTACT_EMERGENCY_KINSHIP = "CONTACT_EMERGENCY_KINSHIP",
  CONSUME_NEWS_TYPE = 'CONSUME_NEWS_TYPE',
  CURRICULUMS_STATE = 'CURRICULUMS_STATE',
  DISABILITY_TYPE = 'DISABILITY_TYPE',
  DEGREE_SUPERIOR = 'DEGREE_SUPERIOR',
  EDUCATION_LEVEL = 'EDUCATION_LEVEL',
  ENROLLMENTS_ACADEMIC_STATE = 'ENROLLMENTS_ACADEMIC_STATE',
  ENROLLMENTS_STATE = 'ENROLLMENT_STATE',
  ENROLLMENTS_TYPE = 'ENROLLMENT_TYPE',
  ENROLLMENTS_WORKDAY = 'ENROLLMENTS_WORKDAY',
  ETHNIC_ORIGIN = 'ETHNIC_ORIGIN',
  EVENTS_STATE = 'EVENTS_STATE',
  ELECTRONIC_DEVICE = 'ELECTRONIC_DEVICE',
  ELECTRIC_SERVICE_BLACKOUT='ELECTRIC_SERVICE_BLACKOUT',
  ECONOMIC_CONTRIBUTION = 'ECONOMIC_CONTRIBUTION',
  FOREIGN_LANGUAGE_NAME = 'FOREIGN_LANGUAGE_NAME',
  GENDER = 'GENDER',
  HOME_OWNERSHIP = 'HOME_OWNERSHIP',
  HOME_FLOOR = 'HOME_FLOOR',
  HOME_ROOF = 'HOME_ROOF',
  HOME_TYPE = 'HOME_TYPE',
  HOME_WALL = 'HOME_WALL',
  IDENTIFICATION_TYPE = 'IDENTIFICATION_TYPE',
  INSTITUTION_PRACTICES_TYPE = 'INSTITUTION_PRACTICES_TYPE',
  INSTITUTIONS_STATE = 'INSTITUTIONS_STATE',
  INDIGENOUS_NATIONALITY = 'INDIGENOUS_NATIONALITY',
  INTERNET_TYPE = 'INTERNET_TYPE',
  MARITAL_STATUS = 'MARITAL_STATUS',
  MONTHLY_SALARY = 'MONTHLY_SALARY',
  MEMBER_HOUSE_NUMBER = 'MEMBER_HOUSE_NUMBER',
  FAMILY_INCOME = 'FAMILY_INCOME',
  FAMILY_PROPERTIES = 'FAMILY_PROPERTIES',
  FAMILY_KINSHIP_CATASTROPHIC_ILLNESS = 'FAMILY_KINSHIP_CATASTROPHIC_ILLNESS',
  FAMILY_KINSHIP_DISABILITY = "FAMILY_KINSHIP_DISABILITY",
  ENROLLMENT_FILE_TYPE_NEW_STUDENT = "ENROLLMENT_FILE_TYPE_NEW_STUDENT",
  ENROLLMENT_FILE_TYPE_OLD_STUDENT = "ENROLLMENT_FILE_TYPE_OLD_STUDENT",
  NATIONALITY = 'NATIONALITY',
  PARALLEL = 'PARALLEL',
  PROJECT_SCOPE = 'PROJECT_SCOPE',
  PANDEMIC_PSYCHOLOGICAL_EFFECT = 'PANDEMIC_PSYCHOLOGICAL_EFFECT',
  REGISTRATION_TYPE = 'REGISTRATION_TYPE',
  SCHOLARSHIP_FUNDING_TYPE = 'SCHOLARSHIP_FUNDING_TYPE',
  SCHOLARSHIP_REASON = 'SCHOLARSHIP_REASON',
  SCHOLARSHIP_TYPE = 'SCHOLARSHIP_TYPE',
  SCHOOL_DAY = 'SCHOOL_DAY',
  SCHOOL_PERIODS_STATE = 'SCHOOL_PERIODS_STATE',
  TYPE_SCHOOL = 'TYPE_SCHOOL',
  SEX = 'SEX',
  STUDENT_INCOME_FOR = 'STUDENT_INCOME_FOR',
  STUDENT_LIVE = 'STUDENT_LIVE',
  STUDENT_OCCUPATION = 'STUDENT_OCCUPATION',
  SUBJECTS_STATE = 'SUBJECTS_STATE',
  SUBJECTS_TYPE = 'SUBJECTS_TYPE',
  SEWERAGE_SERVICE_TYPE= 'SEWERAGE_SERVICE_TYPE',
  SOCIAL_GROUP = 'SOCIAL_GROUP',
  TOWN = 'TOWN',
  TYPE_STUDY_OTHER_CAREER = 'TYPE_STUDY_OTHER_CAREER',
  TYPE_GENDER_VIOLENCE = 'TYPE_GENDER_VIOLENCE',
  TYPE_INJURIES = 'TYPE_INJURIES',
  TYPE_DISCRIMINATION = 'TYPE_DISCRIMINATION',
  UNIVERSITY_CAREER = 'UNIVERSITY_CAREER',
  UNIVERSITY_ACTIONS = 'UNIVERSITY_ACTIONS',
  WORKING_HOURS = 'WORKING_HOURS',
  WATER_SERVICE_TYPE = 'WATER_SERVICE_TYPE',
  YES_NO = 'YES_NO',
  YES_NO_NA = 'YES_NO_NA',
}

export enum CatalogueStateEnum {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
}

export enum CatalogueEnrollmentStateEnum {
  REQUEST_SENT = 'request_sent',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  ENROLLED = 'enrolled',
  REVOKED = 'revoked',
  PAID = 'paid',
  REGISTERED = 'registered',
}

export enum CatalogueSchoolPeriodStateEnum {
  OPEN = 'open',
  CLOSE = 'close',
}

export enum CatalogueSchoolPeriodTypeEnum {
  ORDINARY = 'ordinary',
  EXTRAORDINARY = 'extraordinary',
  ESPECIAL = 'especial',
}

export enum CatalogueSubjectRequirementTypeEnum {
  PREREQUISITE = 'prerequisite',
  CO_REQUISITE = 'co_requisite',
}

export enum CatalogueCareersModalityEnum {
  ON_SITE = 'on-site',
  SEMI_ON_SITE = 'semi-on-site',
  DISTANCE = 'distance',
  DUAL = 'dual',
  ONLINE = 'online',
  HYBRID = 'hybrid',
}

export enum CatalogueYesNoEnum {
  YES = '1',
  NO = '2',
}

export enum UsersIdentificationTypeStateEnum {
  IDENTIFICATION = '1',
  PASSPORT = '2',
}

export enum CatalogueMaritalStatusEnum {
  SINGLE = 'single'
}

export enum CatalogueEnrollmentFileTyeEnum {
  IDENTIFICATION_REQUIREMENT = 'identification_requirement',
  SOCIOECONOMIC_FORM = 'socioeconomic_form',
  APPLICATION = 'application',
  PAYMENT = 'payment',
}
