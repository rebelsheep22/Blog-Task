import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { of } from "rxjs";
import { isNil } from "src/app/utils/is-nil";

export function contentSize(){
  return(control:AbstractControl): ValidationErrors | null =>{
    const string = control.value
    if(isNil(control.value)) return null;
    const isValid = string.split(" ").length>100 && string.split(" ").length<500;
    return isValid ? null : {contentSize:true}
  }
}
