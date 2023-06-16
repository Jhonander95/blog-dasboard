import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UltilsService } from 'src/app/services/ultils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  
  constructor ( private formBuilder: FormBuilder,
                private utilsServices: UltilsService,
                private auth: AuthService
  )
    {
      this.validationMessages = utilsServices.getValidationMessages();
      this.buildForm();
}

form!: FormGroup;
validationMessages: any;



//declare getters for ech field

get emailField() {
  return this.form?.get('email');
}

get emailFieldDirty() {
  return this.emailField?.dirty || this.emailField?.touched;
}

get passwordField() {
  return this.form?.get('password');
}

get passwordFieldDirty() {
  return this.passwordField?.dirty || this.passwordField?.touched;
}

private buildForm() {
  this.form = this.formBuilder.group({
  email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
  password: ['', [Validators.required, Validators.minLength(6)]]
  });
}

login(usuario: any){
  let email = usuario.email;
  let password = usuario.password;

  this.auth.login(email, password);
  
}

ngOnInit(): void {

}


}
