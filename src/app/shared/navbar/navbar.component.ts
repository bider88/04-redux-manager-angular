import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/util/toast.service';
import { AN_ERROR_HAS_OCURRED, firebaseMessages } from 'src/app/models/constants/constant';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) { }

  logoutUser() {
    this.authService.logoutUser().subscribe(
      () => this.router.navigate(['/login']),
      error => this.toastService.showError({
        title: AN_ERROR_HAS_OCURRED,
        message: firebaseMessages(error.message)
      })
    );
  }

}
