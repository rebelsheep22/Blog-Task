import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullName: [null,Validators.required,Validators.minLength(5),Validators.maxLength(20)],
      password: [null,Validators.required],
      repeatPassword: [null,Validators.required],
      email: [null,Validators.required, Validators.email],
    })
  }
  onSubmit(): void{
    console.log("submit")
  }
  backToLogin(): void{
    this.router.navigate(['account/login'])
  }

}
