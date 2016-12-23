import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Auth } from '../auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'login-page app'
  }
})
export class Login implements OnInit {
  public loginForm: FormGroup;
  public errorAutorization = false;

  constructor(private auth: Auth,
              private formBuilder: FormBuilder,
              private router: Router) {
  }
  ngOnInit() {
    this.auth.logOut();
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  public login() {
    if (!this.loginForm.valid) return;
    this.errorAutorization = false;
    this.auth.login(this.loginForm.value)
      .subscribe(() => {
        this.router.navigate(['app']);
      },
      error => {
        this.errorAutorization = error.status === 401;
      });
  }
}
