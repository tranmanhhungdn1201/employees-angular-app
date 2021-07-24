import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  template: `<button (click)="onTest()">Click</button>`,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
  }

  onTest(){
    this.authService.onTest().subscribe(data => console.log(data));
  }

}
