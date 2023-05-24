import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UltilsService } from 'src/app/services/ultils.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {

  form!: FormGroup;
  validationMessages: any;

  permalink: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private utilsServices: UltilsService
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


}
