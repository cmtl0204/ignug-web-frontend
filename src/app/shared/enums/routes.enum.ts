export enum RoutesEnum {
  ADMIN = '/user-administration',
  GUEST = 'guest'
}

export const enum CommonRoutesEnum {
  ACCESS_DENIED = '/common/access-denied',
  NOT_FOUND = '/common/not-found',
  UNDER_MAINTENANCE = '/common/under-maintenance',
}

export enum AuthRoutesEnum {
  LOGIN = 'login',
  PASSWORD_RESET = 'password-reset',
}

export const enum UserAdministrationRoutesEnum {
  ROOT = '',
  LIST = '/list',
  FORM = '/form',
}
