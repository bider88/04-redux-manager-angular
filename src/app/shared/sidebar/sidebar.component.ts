import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/util/toast.service';
import { AN_ERROR_HAS_OCURRED, firebaseMessages } from 'src/app/models/constants/constant';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  logoutUser() {
    this.authService.logoutUser().subscribe(
      () => this.router.navigate(['/login']),
      error => this.toastService.showError({
        title: AN_ERROR_HAS_OCURRED,
        message: firebaseMessages(error.message)
      })
    )
  }

}
