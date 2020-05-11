import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { IncomeExpense } from 'src/app/models/income-expense/income-expense.interface';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/models/user/user.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {

  private itemsCollection: AngularFirestoreCollection<IncomeExpense>;
  private userI: UserInterface;

  constructor(
    private firestore: AngularFirestore
  ) { }

  set user(user: UserInterface) {
    this.userI = user;
  }

  create(incomeExpense: IncomeExpense): Observable<any> {
    return new Observable(observer => {
      this.firestore.doc(`${this.userI.uid}/income-expense`).collection('items').add({ ...incomeExpense })
      .then(() => {
        observer.next();
        observer.complete();
      })
      .catch(error => observer.error(error));
    });
  }

  initIncomeExpenseListListener(): Observable<IncomeExpense[]> {
    // tslint:disable-next-line: max-line-length
    this.itemsCollection = this.firestore.collection<IncomeExpense>(`${this.userI.uid}/income-expense/items`);
    return this.itemsCollection.snapshotChanges().pipe(
      map(snap => snap.map(doc => ({
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data() as any
        }))
      )
    );
  }

  delete(item: IncomeExpense): Observable<any> {
    return new Observable(observer => {
      this.firestore.doc(`${this.userI.uid}/income-expense/items/${item.uid}`).delete()
      .then(() => {
        observer.next();
        observer.complete();
      })
      .catch(() => observer.error());
    });
  }
}
