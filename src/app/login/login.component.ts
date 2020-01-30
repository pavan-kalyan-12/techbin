import { Component, OnInit } from '@angular/core';
import { AuthService} from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'dustbin';
  lat = 16.5665;
  lng = 81.5228;
  lat1 = 16.5660;
  lng1 = 81.5225;
  lat2 = 16.5663;
  lng2 = 81.5223;


  items: Array<any>;
  constructor(public as :AuthService ,private route:Router) { }
  ngOnInit() {
    // this.as.getUsers().subscribe(data => {
    //   this.items = data.map(e => {
    //     console.log(e.payload.doc.data()); 
    //   })
    // });
  }

  // link(){
  //   this.as.linkaccount();
  // }
  logOut(){
    this.as.loggedOut().then( v=>{
      console.log(v);
    })
    this.route.navigate(['/register']);
  }

  // @NgModule({
  //   imports: [
  //     BrowserModule,
  //     AgmCoreModule.forRoot({
  //       apiKey: 'AIzaSyAhusDEobqFjkf5_U328gcU48GbZe_A58Q'
  //     })
  //   ],
  //   declarations: [ LoginComponent ],
  //   bootstrap: [ LoginComponent ]
  // })

}
