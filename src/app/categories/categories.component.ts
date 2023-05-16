import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UltilsService } from '../services/ultils.service';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  constructor ( private formBuilder: FormBuilder,
                private categoriesServices: CategoriesService,
                private utilsServices: UltilsService)
                {
                  this.validationMessages = utilsServices.getValidationMessages();
                  this.buildForm();
  }

  form!: FormGroup;
  validationMessages: any;


  //declare getters for ech field

  get categoryField() {
    return this.form?.get('category');
  }

  get categoryFieldDirty() {
    return this.categoryField?.dirty || this.categoryField?.touched;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      category: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  addCategory(form: any) {
    let categoryData: Category = {
      category: form
    }

    this.categoriesServices.saveCategories(categoryData);
   /*  let subCategoryData = {
      subCategory: 'sub category 1'
    }

    this.db.collection('categories').add(categoryData).then( docRef => {
      console.log(docRef);

      this.db.collection('categories').doc(docRef.id).collection('subcategories').add(subCategoryData).then(docRef1 => {
        console.log(docRef1);

        this.db.doc(`categories/${docRef.id}/subcategories/${docRef1.id}`).collection('subSubCategories').add(subCategoryData).then( docRef2 => {
          console.log('Second level subcatecories saved succesfully');
        } )
         this.db.collection('categories').doc(docRef.id).collection('subcategories').doc(docRef1.id).collection('subSubCategories').add(subCategoryData).then(docRef2 => {
          console.log('Second level subcatecories saved succesfully');
        })

      })

    })
    .catch(err => { console.log(err);
     } )
    console.log(form);*/
  }


}
