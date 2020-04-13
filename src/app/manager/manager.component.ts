import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../services/auth.service';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  constructor(public as :AuthService ,private route:Router) { }

  ngOnInit() {
  }
  trylogin() {
    this.as.doGoogleLogin();
    this.route.navigate(['/login']);
  }

}
