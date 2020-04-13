import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public as :AuthService ,private route:Router) { }

  ngOnInit() {
  }
  login() {
    this.route.navigate(['/register']);
  }
  manager(){
    this.route.navigate(['/manager']);
  }
  
}
