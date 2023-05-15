import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
/* import { AngularFirestore } from '@angular/fire/firestore'; */
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  constructor ( private formBuilder: FormBuilder,
                private db: AngularFirestore) {
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
    let categoryData = {
      category: form
    }
    let subCategoryData = {
      subCategory: 'sub category 1'
    }

    this.db.collection('categories').add(categoryData).then( docRef => {

      console.log(docRef);
      this.db.collection('categories').doc(docRef.id).collection('subcategories').add(subCategoryData).then(docRef1 => {
        console.log(docRef1);
      })

    })
    .catch(err => { console.log(err);
     } )
    console.log(form);
  }


}
