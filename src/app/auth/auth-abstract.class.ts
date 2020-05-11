import { FormGroup } from '@angular/forms';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from 'src/app/shared/ui.actions';

export abstract class AuthAbstract implements OnInit, OnDestroy {

  configLoader = {
    animationType: ngxLoadingAnimationTypes.circleSwish,
    primaryColour: '#ffffff',
    secondaryColour: '#ccc',
    backdropBorderRadius: '3px'
  };
  loadingTemplate: TemplateRef<any>;
  authForm: FormGroup;
  loading = false;
  subscriptions: Subscription[] = [];

  constructor(
    protected store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.listenStore();
  }

  ngOnDestroy() {
    this.stopLoading();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public abstract buildForm(): void;
  public abstract authUser(): void;

  listenStore() {
    const subscription = this.store.select('ui').subscribe(uiStore => this.loading = uiStore.isLoading);
    this.subscriptions.push(subscription);
  }

  isValidFormControlName(control: string): boolean {
    return this.authForm.get(control).valid;
  }

  stopLoading(): void {
    this.store.dispatch(ui.stopLoading());
  }
}
