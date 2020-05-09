import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UserInterface } from 'src/app/models/user/user.interface';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/util/toast.service';
import { firebaseMessages, AN_ERROR_HAS_OCURRED } from 'src/app/models/constants/constant';
import { AuthAbstract } from '../../auth-abstract.class';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends AuthAbstract {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    store: Store<AppState>
  ) {
    super(store);
  }

  buildForm(): void {
    this.authForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  authUser(): void {
    if (this.authForm.valid) {
      this.store.dispatch(ui.isLoading());
      const user: UserInterface = { ...this.authForm.value } as UserInterface;
      const subscription = this.authService.createUser(user).subscribe(
        () => {
          this.toastService.showSuccess({
            title: 'Registro exitoso',
            message: '¡Se ha registrado exitosamente!'
          });
          this.router.navigate(['/']);
        },
        error => this.toastService.showError({
          title: AN_ERROR_HAS_OCURRED,
          message: firebaseMessages(error.message)
        }),
        () => this.stopLoading()
      );
      this.subscriptions.push(subscription);
    }
  }

}
