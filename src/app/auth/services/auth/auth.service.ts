import { Injectable } from '@angular/core';
import { UserInterface } from '../../../models/user/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
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
      .then(credential => {
        const { user: { uid } } = credential;
        user.uid = uid;
        return this.saveUser(user);
      })
      .then(() => observer.next())
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

  isAuth() {
    return this.auth.authState.pipe(
      map(user => user != null)
    );
  }

  saveUser(user: UserInterface): Promise<any> {
    return new Promise((resolve, reject) => {
      delete user.password;
      this.firestore.doc(`${user.uid}/user`)
      .set(user)
      .then(() => resolve())
      .catch(error => reject(error));
    });
  }
}
