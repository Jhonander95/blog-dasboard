import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

constructor(  private formBuilder: FormBuilder,
              private utilServices: UtilService,
              private commentsServices: CommentsService
              ){
                this.buildForm();
                this.validationMessages = this.utilServices.getValidationMessages();
              }
 
  @Input() idPost!: string;

  form!: FormGroup;
  validationMessages: any;


  
  get nameField() {
    return this.form?.get('name');
  }

  get nameFieldDirty() {
    return this.nameField?.dirty || this.nameField?.touched;
  }

  get commentField() {
    return this.form?.get('comment');
  }

  get commentFieldDirty() {
    return this.commentField?.dirty || this.commentField?.touched;
  }


  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      comment: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {

  }

  onComment(form: any) {

    const data = {
      name: form?.name,
      comment: form?.comment,
      idPost: this.idPost,
      createdAt: new Date()
    }

    this.commentsServices.createComment(data);
    this.form.reset();

  }

}
