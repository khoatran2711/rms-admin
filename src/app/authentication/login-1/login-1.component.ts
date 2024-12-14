import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
// import  socialIcons  from './../../../assets/data/pages/social-items.json';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  templateUrl: './login-1.component.html',
})
export class Login1Component {
  loginForm: FormGroup;
  isLoading = false;
  error = false;
  socialMediaButtons = [];

  validateForm!: UntypedFormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      this.apiService.login(this.validateForm.value).subscribe((res) => {
        this.authService.saveUser(res)
        this.router.navigate(['/pages']).then(() => {
          window.location.reload();
        });
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls['checkPassword'].updateValueAndValidity()
    );
  }

  passwordVisible = false;
  password?: string;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['admin@gmail.com', [Validators.required]],
      password: ['admin123', [Validators.required]],
      // remember: [true],
    });
  }
}
