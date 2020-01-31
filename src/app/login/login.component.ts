import { Component, OnInit ,ChangeDetectorRef } from '@angular/core';
import { AuthService} from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'dustbin';
  map: mapboxgl.Map;
  style = 'mapbox://styles/pa1-kalyan-s/ck61q0pz90csu1intywjwavpb';
  lat = 16.5665;
  lng = 81.5228;

  items: Array<any>;
  constructor(public as :AuthService ,private route:Router) { }
  ngOnInit() {
    // this.as.getUsers().subscribe(data => {
    //   this.items = data.map(e => {
    //     console.log(e.payload.doc.data()); 
    //   })
    // });
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [this.lng, this.lat]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
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
