// angular import
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmptyComponent } from 'src/app/demo/layout/empty';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AuthService } from '../../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../authentication.scss']
})
export default class LoginComponent {
  // public props
  hide = true;
  loginForm: FormGroup;
  submitted = false;
  error = '';
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  getErrorMessage(controlName: string): string {
    if (controlName === 'email') {
      return this.f['email'].hasError('required') ? 'Email is required' : '';
    } else if (controlName === 'password') {
      return this.f['password'].hasError('required') ? 'Password is required' : '';
    }
    return '';
  }

  onSubmit() {
    this.submitted = true;
    console.log('Form submitted', this.loginForm.value);

    if (this.loginForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.loading = true;
    console.log('Form submitted', this.loginForm.value);

    this.authService.login(this.f['email'].value, this.f['password'].value).subscribe(
      (data) => {
        console.log('Data received in login component:', data);
        if (data && data.token) {
          console.log('Reindirizzamento alla dashboard...');
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Login failed';
        }
        this.loading = false;
      },
      (error) => {
        console.log('Login error', error);
        (this.error = 'Email or Password is Wrong, try again'), error;
        this.loading = false;
      }
    );
  }

  // // public method
  // loginType = [
  //   {
  //     image: 'assets/images/authentication/facebook.svg',
  //     alt: 'facebook',
  //     title: 'Sign In with Facebook'
  //   },
  //   {
  //     image: 'assets/images/authentication/twitter.svg',
  //     alt: 'twitter',
  //     title: 'Sign In with Twitter'
  //   },
  //   {
  //     image: 'assets/images/authentication/google.svg',
  //     alt: 'google',
  //     title: 'Sign In with Google'
  //   }
  // ];
}
