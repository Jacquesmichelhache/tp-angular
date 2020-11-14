import { AbstractControl, ValidatorFn } from "@angular/forms";

export function testValidatorFactory(emailRe:RegExp):ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const valid = emailRe.test(control.value);
    //console.log("email is valid?: " + valid + " for: " + control.value + " and regex:" + emailRe.source)
    return valid === false ? {invalidEmail: {value: control.value}} : null;
  };
}
