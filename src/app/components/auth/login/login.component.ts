
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '@/store/auth/auth.actions';
import { selectConnectedUser, selectToken } from '@/store/auth/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted = false;

  public store = inject(Store);

  connectedUser$ = this.store.select(selectConnectedUser);
  token$ = this.store.select(selectToken);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.store.select(selectConnectedUser).subscribe(user => {
      console.log("Connected user : ", user);
    });

     this.store.select(selectToken).subscribe(token => {
      console.log("selectToken : ", token);
    });


    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get formValues() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const username = this.formValues['username'].value;
      const password = this.formValues['password'].value;
      this.store.dispatch(login({ username, password }));
    }
  }
}
