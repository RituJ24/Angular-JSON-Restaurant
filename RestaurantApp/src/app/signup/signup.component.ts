import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; //incompatible
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    /*this.signupForm = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      password: [''],
    })*/

    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required], // Make fields required
      email: ['', [Validators.required, Validators.email]], // Add email validation
      mobile: ['', Validators.required], // Make fields required
      password: ['', Validators.required], // Make fields required
    });
  }

  //method for user signup
  /*signUp() {
    this._http
      .post<any>("http://localhost:3000/signup", this.signupForm.value)
      .subscribe(
        (res) => {
          alert("Signup successfull!");
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        err => {
          alert("Something's wrong :/ Please re check your entered data")
        }
      )
  }*/

  // Method for user signup
  signUp() {
    if (this.signupForm.valid) {
      this._http
        .post<any>('http://localhost:3000/signup', this.signupForm.value)
        .subscribe(
          (res) => {
            alert('Signup successful!');
            this.signupForm.reset();
            this.router.navigate(['login']);
          },
          (err) => {
            alert("Something's wrong :/ Please re-check your entered data");
          }
        );
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
