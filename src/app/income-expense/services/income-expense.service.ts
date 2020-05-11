import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IncomeExpense } from 'src/app/models/income-expense/income-expense.interface';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  create(incomeExpense: IncomeExpense): Observable<any> {
    const { user: { uid } } = this.authService;
    return new Observable(observer => {
      this.firestore.doc(`${uid}/income-expense`).collection('items').add({ ...incomeExpense })
      .then(() => observer.next())
      .catch(error => observer.error(error));
    });
  }
}
