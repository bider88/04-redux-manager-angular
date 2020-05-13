import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/util/toast.service';
import { UserInterface } from 'src/app/models/user/user.interface';
import { firebaseMessages, AN_ERROR_HAS_OCURRED } from 'src/app/models/constants/constant';
import { AuthAbstract } from '../../auth-abstract.class';
import { Store } from '@ngrx/store';
import * as ui from 'src/app/shared/ui.actions';
import { AppStateIncomeExpense } from 'src/app/income-expense/income-expense.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AuthAbstract {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    store: Store<AppStateIncomeExpense>
  ) {
    super(store);
  }

  buildForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  authUser(): void {
    if (this.authForm.valid) {
      this.store.dispatch(ui.isLoading());
      const user: UserInterface = { ...this.authForm.value } as UserInterface;
      const subscription = this.authService.loginUser(user).subscribe(
        () => {
          this.router.navigate(['/home']);
          this.stopLoading();
        }, error => {
          this.toastService.showError({
            title: AN_ERROR_HAS_OCURRED,
            message: firebaseMessages(error)
          });
          this.stopLoading();
        }
      );
      this.subscriptions.push(subscription);
    }
  }
}
