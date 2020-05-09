import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UserInterface } from 'src/app/models/user/user.interface';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/util/toast.service';
import { firebaseMessages, AN_ERROR_HAS_OCURRED } from 'src/app/models/constants/constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.signupForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  createUser(): void {

    if (this.signupForm.valid) {
      const user: UserInterface = { ...this.signupForm.value } as UserInterface;
      this.authService.createUser(user).subscribe(
        credential => {
          console.log('credential', credential);
          this.toastService.showSuccess({
            title: 'Registro exitoso',
            message: 'Se ha registrado exitosamente el usuario'
          });
          this.router.navigate(['/']);
        },
        error => {
          console.error(error);
          this.toastService.showError({
            title: AN_ERROR_HAS_OCURRED,
            message: firebaseMessages(error.message)
          });
        }
      );
    }
  }

  isValidFormControlName(control: string): boolean {
    return this.signupForm.get(control).valid;
  }

}
