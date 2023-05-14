import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
/* import { AngularFirestore } from '@angular/fire/firestore'; */
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  constructor ( private formBuilder: FormBuilder) {
    this.buildForm();
  }

  form!: FormGroup;


  //declare getters for ech field

  get categoryField() {
    return this.form?.get('category');
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      category: ['']
    });
  }

  addCategory(form: any) {

    console.log(form);
  }


}
