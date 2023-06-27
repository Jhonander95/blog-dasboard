import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from '../services/util.service';
import { Sub } from '../models/sub';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss']
})


export class SubscriptionFormComponent implements OnInit {

  isEmailError: boolean = false;
  isSubs: boolean = false;

  constructor ( private formBuilder: FormBuilder,
                private utilServices: UtilService,
                private subscribersService: SubscribersService )
                {
                  this.buildForm();
                  this.validationMessages = this.utilServices.getValidationMessages();
  }

  ngOnInit(): void {
  }

  form!: FormGroup;
  validationMessages: any;

  onSubscription(form: any) {

    const subData: Sub = {
      name: form.name,
      email: form.email
    }
    this.subscribersService.checkSubs(form.email).subscribe( res => {
      if(res.empty){
        this.subscribersService.addSubs(subData);
        this.isSubs = true;
      } else {
        console.log('Email ya subscrito');
        this.isEmailError = true;
      }
    })

  }

  //declare getters for ech field

  get nameField() {
    return this.form?.get('name');
  }

  get nameFieldDirty() {
    return this.nameField?.dirty || this.nameField?.touched;
  }

  get emailField() {
    return this.form?.get('email');
  }

  get emailFieldDirty() {
    return this.emailField?.dirty || this.emailField?.touched;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]]
    });
  }

}
