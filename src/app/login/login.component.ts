import { Component, OnInit ,ChangeDetectorRef } from '@angular/core';
import { AuthService} from 'src/app/services/auth.service';
import { MapService } from 'src/app/services/map.service';
import { Router } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
// import  *  as  data  from  '../../assets/mapdata.json';
// import { IGeoJson,FeatureCollection, GeoJson } from '../map';
import { Observable, Subscription } from "rxjs";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public dbData: Observable<any>;
  values: Array<any> = []; //Array Initialization.
  title = 'dustbin';
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  // style = 'mapbox://styles/pa1-kalyan-s/ck61y6j300ke21imuck6cm836';
  lat = 16.5665;
  lng = 81.5228;
  items: Array<any>;
  
  constructor(public as :AuthService ,private route:Router) { }
  features: string[];
  ngOnInit() {
    
    // this.as.getUsers().subscribe(data => {
    //   this.items = data.map(e => {
    //     console.log(e.payload.doc.data()); 
    //   })
    // });

    this.dbData = this.as.display_details();


    var firebaseGeojsonFeatures = [];

    // Iterating over the data which is in the observable.
    this.dbData.subscribe((val) =>
      val.forEach((element) => {
        var f1 = element;
        // console.log(element);
        firebaseGeojsonFeatures.push(element); // Adding data to the array.
        
      }) 
      
    );



    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;
      var map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        center: [this.lng,this.lat],
        zoom: 13
    });
    
    // var firebaseData = { 
    //   "messages" : {
    //     "-KUE2EwfvbI48Azw01Hv" : {
    //       "geometry" : {
    //         "coordinates" : [ 81.5225,16.5660 ],
    //         "type" : "Point"
    //       },
    //       "properties": {
    //         "description":
    //             "<strong>BIN ID : 501</strong><p> BIN % : 68% </p>",
    //         "icon": "bar"
    //     },
    //       "type" : "Issue"  
    //     },
    //     "-KUD2EwfvbI48Azw01Hv" : {
    //       "geometry" : { 
    //         "coordinates" : [81.5225,16.5663 ],
    //         "type" : "Point"
    //       },
    //       "properties": {
    //         "description":
    //             "<strong>BIN ID : 502</strong><p> BIN % : 80% </p>",
    //         "icon": "bar"
    //     },
    //       "type" : "Issue"
    //     }
    //   } 
    // }
    
    
    // for (var key in  firebaseGeojsonFeatures ) { //firebaseData.messages
    //   // var f = firebaseData.messages[key];
    //   console.log(key);                             //firebaseData.messages[key]
    //   // firebaseGeojsonFeatures.push(f);
    // }
    
    
    
    
    
    
    
    
    map.on('load', function() {
      map.addSource('firebase', {
        'type': 'geojson',
        'data': {type: 'FeatureCollection',
        features: firebaseGeojsonFeatures,
      
      }
      }); 
      // Add a layer showing the places.
      map.addLayer({
          'id': 'firebase',
          'type': 'symbol', 
          'source': 'firebase',
          'layout': {
              'icon-image': '{icon}-15',
              'icon-allow-overlap': true 
          }
      });

     
      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description  HTML from its properties.
      map.on('click', 'firebase', function(e) {
          var coordinates =e.features[0].geometry.coordinates.slice();
          var description = e.features[0].properties.description;
           
          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          // features[0].forEach(function(marker){
          //   let e1=document.createElement('div');
          //   e1.className = 'marker';
          //   new mapboxgl.Marker(e1)
          //     .setLngLat(coordinates)
          //     .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          //     .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
          //     .addTo(map);
          // })

          new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML( description )
              .addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on('mouseenter', 'firebase', function() {
          map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'firebase', function() {
          map.getCanvas().style.cursor = ''; 
       
    }); 
   }); 






     // Add map controls
     map.addControl(new mapboxgl.NavigationControl());
     map.addControl(new mapboxgl.GeolocateControl());
    
   
    
  }
  
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