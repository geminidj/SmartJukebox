import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import { Subject } from "rxjs";
import {UserInfo} from "../../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;
  userInfo: UserInfo | undefined;
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
      this.authService.login(this.formGroup.value);
    }
  }

  saveData(key: string, data: string){
    console.log("SaveData");
    console.log("key",key,"data",data);
    sessionStorage.setItem(key,data);
  }

  getData(key:string){
    return sessionStorage.getItem(key);
  }
}

