import {AbstractControl, ValidationErrors, Validators} from "@angular/forms";

export interface RecordFields {
  key: string;
  label: string;
  value?: any;
  type: InputType;
  dropDownOptions?: any[],
  validators?: any[];
  default?: any;
  multiLang?: boolean;
  url?: string
}

export enum InputType {
  TEXT, TOGGLE, DROP_DOWN, ADVANCE_DROPDOWN
}

export class Global {
  static name_validator = [Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')];
  static mobile_validator = [Validators.maxLength(10), Validators.minLength(10)];
  static aadhar_validator = [Validators.maxLength(12), Validators.minLength(12)];
  static short_days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  // static key_buffalo_cow_rate_card = "BUFFALO";
  // static key_cow_rate_card = "COW";
  // static key_clients = 'clients';
  static key_token = 'token';
  static key_refresh_token = 'refreshToken';

  static key_tenant_type = 'tenantType';

  static key_loginId = 'loginId';
  static key_role = 'role';
  static key_firstName = 'firstName';

  static location = 'location';
  static signalDevId = 'signalDevId';

  static studentClass = 'studentClass';

}


export function PasswordValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value || '';

  const hasUppercase = /[A-Z]/.test(value);
  const hasLowercase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);

  const valid = hasUppercase && hasLowercase && hasNumber;

  return valid ? null : {invalidPassword: true};
}

