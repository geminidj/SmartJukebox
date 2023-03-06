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
    console.log("loginProcess called");
    if (this.formGroup.valid) {
      console.log("valid login form");

      this.authService.login(this.formGroup.value);
      // this.authService.login(this.formGroup.value).subscribe((result) => {
      //   this.userInfo!.info.isLoggedIn = result.success;
      //   if(this.userInfo!.info.isLoggedIn){
      //     console.log("User is logged in");
      //     //login successful
      //     console.log("LOGIN OK");
      //     this.saveData('email',result.results[0].email);
      //     this.saveData('picture',result.results[0].picture);
      //     this.saveData('name',result.results[0].name);
      //     this.saveData('isLoggedIn','true');
      //
      //     this.userInfo!.info.email = result.results[0].email;
      //     this.userInfo!.info.given_name = result.results[0].name;
      //     this.userInfo!.info.picture = result.results[0].picture;
      //     this.userInfo!.info.isLoggedIn = result.success;
      //
      //     this.authService.userProfileSubject.next(this.userInfo!);
      //
      //   }
      //   else{
      //     //login failed
      //     console.log("LOGIN FAIL")
      //   }
      //   console.log(JSON.stringify(result));

      //});
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

