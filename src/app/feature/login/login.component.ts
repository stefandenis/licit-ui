import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/auth/auth.mock.service';
import { login } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  buttonFocus: boolean = false;
  email = new FormControl('');
  password = new FormControl('');
  loggingIn = false;
  pw: string;
  constructor(private store: Store<any>, private authService: AuthService) {
    this.email.valueChanges.subscribe();
    this.password.valueChanges.subscribe();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.loggingIn = false;
  }

  login() {
    this.loggingIn = true;
    this.store.dispatch(
      login({ email: this.email.value, password: this.password.value })
    );
  }
}
