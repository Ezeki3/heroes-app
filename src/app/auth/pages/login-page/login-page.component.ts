import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit(): void {
  }

  onLogin():void{

    this.authService.login('user@gmail.com', '123abc').
      subscribe( user => {
        console.log(user);
        this.router.navigate(['/'])
      })
  }

}
