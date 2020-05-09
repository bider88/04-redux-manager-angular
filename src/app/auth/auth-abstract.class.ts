import { FormGroup } from '@angular/forms';

export abstract class AuthAbstract {

  authForm: FormGroup;

  public abstract buildForm(): void;
  public abstract authUser(): void;

  isValidFormControlName(control: string): boolean {
    return this.authForm.get(control).valid;
  }
}
