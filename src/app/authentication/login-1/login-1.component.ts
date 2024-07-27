import { Component } from '@angular/core'
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
// import  socialIcons  from './../../../assets/data/pages/social-items.json';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
    templateUrl: './login-1.component.html'
})

export class Login1Component {
  loginForm: FormGroup;
  isLoading = false;
  error = false;
  socialMediaButtons = [];

  validateForm!: UntypedFormGroup;

  constructor(private fb: FormBuilder, private router: Router, private location: Location, private apiService: ApiService) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.apiService.login(this.validateForm.value).subscribe(res => {
        console.log(res)
         this.router.navigate(['/dashboard']).then(() => {
        window.location.reload();
      });
      })
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
