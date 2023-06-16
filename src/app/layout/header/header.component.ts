import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  email: string = '';
  isLoggedIn$!: Observable<boolean>;

  constructor(private route: Router,
              private auth: AuthService  
    ){
    
  }

  logout(){
    this.auth.logOut();
  }

  ngOnInit(): void {

    const user = localStorage.getItem('user');
    if (user !== null) {
      this.email = JSON.parse(user).email;
    }

    this.isLoggedIn$ = this.auth.isLoggedIn();

  }

}
