import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //instance data
  data:any;

  constructor(private route:Router) { }

  ngOnInit() {
  }

  toLogin(l)
  {
    this.data=l
    console.log(this.data)
    alert('login successful')
    this.route.navigate(['/userorders'])
  }

}
