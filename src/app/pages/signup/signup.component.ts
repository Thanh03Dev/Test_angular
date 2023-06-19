import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  formSignup = this.fb.group({
    name: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    confirmPassword: ["", [Validators.required]]
  }, { validators: this.checkPasswords })
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {

  }

  checkPasswords(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password === confirmPassword) return null;
    return { norMatch: true };
  }

  onHandleSubmit() {
    if (this.formSignup.valid) {
      this.authService.signup(this.formSignup.value).subscribe(data => {
        console.log(data);
      })
    }
    console.log(this.formSignup.value);
    this.router.navigate(['signin']);
  }
}
