import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { incomeExpenseType } from '../models/income-expense/income-expense.interface';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.scss']
})
export class IncomeExpenseComponent implements OnInit {

  readonly income = 'income';
  readonly expense = 'expense';
  incomeForm: FormGroup;
  type: incomeExpenseType = this.income;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.incomeForm = this.fb.group({
      description: [null, Validators.required],
      mount: [null, [Validators.required, Validators.min(0.01), , Validators.max(99999999999), Validators.maxLength(11)]],
    });
  }

  save() {
    console.log(this.incomeForm);
    if (this.incomeForm.valid) {

    }
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
