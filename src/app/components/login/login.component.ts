import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  loginProcess() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe((result: { success: any; }) => {
        if (result.success) {
          console.log('Login successful');
        } else {
          console.log('Result failure');
        }
        console.log(JSON.stringify(result));
      });
    }
  }
}

