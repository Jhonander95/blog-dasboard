import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;

  constructor( private afAuth: AngularFireAuth,
               private toastr: ToastrService,
               private route: Router           
  ) { }

  login(email: any, password: any){
    this.afAuth.signInWithEmailAndPassword(email, password).then( docRef => {
      this.toastr.success('Logged In Successfully');
      this.loadUser();

      this.loggedIn.next(true);
      this.isLoggedInGuard = true;

      this.route.navigate(['/']);
    }).catch(e => {
      this.toastr.warning('Usuario o Contraseña Invalidos');
    })
  }

  loadUser(){
    this.afAuth.authState.subscribe( user => {
      localStorage.setItem('user', JSON.stringify(user) );
    })
  }

  logOut(){
    this.afAuth.signOut().then( () =>  {
      this.toastr.success('User Logged Out Successfully');

      this.loggedIn.next(false);
      this.isLoggedInGuard = false;

      this.route.navigate(['/login']);
    })
  }

  isLoggedIn(){
    return this.loggedIn.asObservable();
  }

}
