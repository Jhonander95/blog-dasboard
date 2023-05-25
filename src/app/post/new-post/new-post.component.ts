import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { UltilsService } from 'src/app/services/ultils.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  form!: FormGroup;
  validationMessages: any;
  imgSrc: any = './assets/placeholder.jpg';
  seletedImg: any;

  categories: any = [];

  permalink: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private utilsServices: UltilsService,
    private categoriesServices: CategoriesService
  ){
    this.validationMessages = utilsServices.getValidationMessages();
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      permalink: ['', [Validators.required] ],
      excerpt: ['', Validators.required ]
    });
  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) =>{
      this.imgSrc = e.target?.result;
      
    }

    reader.readAsDataURL($event.target.files[0]);
    this.seletedImg = $event.target.files[0];
  }

  addPost(form: any) {
    console.log(form);
  }

  onTitleChanges($event: any) {
    console.log($event.target.value);

    const title = $event.target.value;
    this.permalink = title.replace(/\s/g,'-');
  }

  get titleField() {
    return this.form?.get('title');
  }

  get titleFieldDirty() {
    return this.titleField?.dirty || this.titleField?.touched;
  }

  get permalinkField() {
    return this.form?.get('permalink');
  }

  get permalinkFieldDirty() {
    return this.permalinkField?.dirty || this.permalinkField?.touched;
  }

  ngOnInit(): void {
   this.categoriesServices.LoadData().subscribe( cat => {
    this.categories = cat;
    console.log(this.categories);
    
   } );
  }


}
