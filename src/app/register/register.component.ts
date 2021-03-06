import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
// import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {



  public colist:any[];
  constructor(private authService:AuthService,public router:Router) { }

  ngOnInit() {
    
  }
  trylogin() {
    this.authService.doGoogleLogin();
    this.router.navigate(['/login']);
  }
 
  login(){
    this.authService.anonymousLogin();
    this.router.navigate(['/user']);
  } 
}
export class AppRegister{


}
