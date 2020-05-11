import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { incomeExpenseType, IncomeExpense } from '../models/income-expense/income-expense.interface';
import { IncomeExpenseService } from './services/income-expense.service';
import { ToastService } from '../services/util/toast.service';
import { AN_ERROR_HAS_OCURRED, AN_ERROR_HAS_OCURRED_WHEN_WAS_PROCCESSED } from '../models/constants/constant';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../shared/ui.actions';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.scss']
})
export class IncomeExpenseComponent implements OnInit, OnDestroy {

  loading = false;
  readonly income: incomeExpenseType = 'income';
  readonly expense: incomeExpenseType = 'expense';
  incomeForm: FormGroup;
  type: incomeExpenseType;
  configLoader = {
    animationType: ngxLoadingAnimationTypes.circleSwish,
    primaryColour: '#ffffff',
    secondaryColour: '#ccc',
    backdropBorderRadius: '3px'
  };
  loadingTemplate: TemplateRef<any>;
  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private incomeService: IncomeExpenseService,
    private toastService: ToastService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.listenStore();
    this.setInitialType();
    this.buildForm();
  }

  ngOnDestroy() {
    this.store.dispatch(ui.stopLoading());
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  buildForm() {
    this.incomeForm = this.fb.group({
      description: [null, Validators.required],
      mount: [null, [Validators.required, Validators.min(0.01), , Validators.max(99999999999), Validators.maxLength(11)]],
    });
  }

  save() {
    if (this.incomeForm.valid) {
      this.store.dispatch(ui.isLoading());
      const { description, mount } = this.incomeForm.value;
      const incomeExpense = new IncomeExpense(description, mount, this.type);
      this.incomeService.create(incomeExpense).subscribe(
        () => {
          this.store.dispatch(ui.stopLoading());
          this.toastService.showSuccess({
            title: 'Registro creado exitosamente',
            message: description
          });
          this.setInitialType();
          this.incomeForm.reset();
        },
        error => {
          console.error(error);
          this.store.dispatch(ui.stopLoading());
          this.toastService.showError({
            title: AN_ERROR_HAS_OCURRED,
            message: AN_ERROR_HAS_OCURRED_WHEN_WAS_PROCCESSED
          });
        }
      );
    }
  }

  listenStore() {
    this.subscription = this.store.select('ui').subscribe(uiStore => this.loading = uiStore.isLoading);
  }

  setInitialType() {
    this.type = this.income;
  }

  isValidFormControlName(control: string): boolean {
    return this.incomeForm.get(control).valid;
  }

  setClassActive(type: incomeExpenseType): string {
    return this.type === type ? 'active' : '';
  }

  setType(type: incomeExpenseType) {
    this.type = type;
  }

}
