import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/util/toast.service';
import { UserInterface } from 'src/app/models/user/user.interface';
import { firebaseMessages, AN_ERROR_HAS_OCURRED } from 'src/app/models/constants/constant';
import { AuthAbstract } from '../auth-abstract.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AuthAbstract implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  authUser(): void {
    console.log('this.authForm', this.authForm)
    if (this.authForm.valid) {
      const user: UserInterface = { ...this.authForm.value } as UserInterface;
      this.authService.loginUser(user).subscribe(
        credential => {
          console.log('credential', credential);
          this.router.navigate(['/']);
        }, error => {
          console.error(error);
          this.toastService.showError({
            title: AN_ERROR_HAS_OCURRED,
            message: firebaseMessages(error.message)
          });
        }
      );
    }
  }
}
