import { Injectable } from '@angular/core';
import { UserInterface } from '../../models/user/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: AngularFireAuth
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe(
      user => {
        console.log('user', user);
      }
    );
  }

  loginUser(user: UserInterface): Observable<any> {
    const { email, password } = user;
    return new Observable(observer => {
      this.auth.signInWithEmailAndPassword(email, password)
      .then(credential => observer.next(credential))
      .catch(error => observer.error(error));
    });
  }

  createUser(user: UserInterface): Observable<any> {
    const { email, password } = user;
    return new Observable(observer => {
      this.auth.createUserWithEmailAndPassword(email, password)
      .then(credential => observer.next(credential))
      .catch(error => observer.error(error));
    });
  }

  logoutUser(): Observable<any> {
    return new Observable(observer => {
      this.auth.signOut()
      .then(() => observer.next())
      .catch(error => observer.error(error));
    });
  }
}
