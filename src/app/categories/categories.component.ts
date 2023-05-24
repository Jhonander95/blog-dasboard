import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UltilsService } from '../services/ultils.service';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {


  categories: any = [];
  editCategory: any = [];
  formStatus: string = 'Add';
  categoryId: string = '';

  constructor ( private formBuilder: FormBuilder,
                private categoriesServices: CategoriesService,
                private utilsServices: UltilsService)
                {
                  this.validationMessages = utilsServices.getValidationMessages();
                  this.buildForm();
  }

  ngOnInit(): void {
    this.categoriesServices.LoadData().subscribe( val => {
      this.categories = val;
      console.log(val);
      
      console.log(this.categories);
    })
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
    if ( this.formStatus == 'Add' ) {
      this.categoriesServices.saveCategories(categoryData);
      this.form.reset();
    }else if (this.formStatus == 'Edit' ) {
      this.categoriesServices.updateCategory(categoryData, this.categoryId);
      this.formStatus = 'Add';
      this.form.reset();
    }

   
  }

  onEdit(category: any, id: string) {
    console.log(category);
    this.editCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
    console.log(this.categoryId);
  }

  onDelete(id: string) {
    this.categoriesServices.deleteCategory(id);
  }


}
