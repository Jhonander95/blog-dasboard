import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { UltilsService } from 'src/app/services/ultils.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';

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
  post: any;
  permalink: string = '';
  formStatus: string = 'Add new';
  docId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private utilsServices: UltilsService,
    private categoriesServices: CategoriesService,
    private postService: PostService,
    private route: ActivatedRoute
  ){
  /*   this.route.queryParams.subscribe(val => {
      let id = val["id"];
      this.postService.loadOneData(id).subscribe( post => {
        this.post = post;
        console.log(this.post);

        this.form = this.formBuilder.group({
          title: [this.post?.title || '' , [Validators.required, Validators.minLength(10)]],
          permalink: [this.post?.permalink || '', [Validators.required] ],
          excerpt: [this.post?.excerpt || '', [Validators.required, Validators.minLength(50)] ],
          category: [this.post?.category.categoryId || '', [Validators.required] ],
          postImg: ['', [Validators.required]],
          content: [this.post?.content || '', [Validators.required]]
        });

        console.log(this.post?.title);
        
      })
    })

   
    
     */
    this.buildForm();
   this.validationMessages = utilsServices.getValidationMessages();
   
  }

    //declare getters for ech field

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

    get excerptField() {
      return this.form?.get('excerpt');
    }
  
    get excerptFieldDirty() {
      return this.excerptField?.dirty || this.excerptField?.touched;
    }

    get categoryField() {
      return this.form?.get('category');
    }
  
    get categoryFieldDirty() {
      return this.categoryField?.dirty || this.categoryField?.touched;
    }

    get postImgField() {
      return this.form?.get('postImg');
    }
  
    get postImgFieldDirty() {
      return this.postImgField?.dirty || this.postImgField?.touched;
    }

    get contentField() {
      return this.form?.get('content');
    }
  
    get contentFieldDirty() {
      return this.contentField?.dirty || this.contentField?.touched;
    }

/*     private buildForm() {
      this.form = this.formBuilder.group({
        title: [this.post?.title , [Validators.required, Validators.minLength(10)]],
        permalink: [this.post?.permalink || '', [Validators.required] ],
        excerpt: [this.post?.excerpt || '', [Validators.required, Validators.minLength(50)] ],
        category: [this.post?.category || '', [Validators.required] ],
        postImg: [this.post?.postImg || '', [Validators.required]],
        content: [this.post?.content || '', [Validators.required]]
      });

      console.log(this.post?.permalink);
      
    } */

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', [Validators.required] ],
      excerpt: ['', [Validators.required, Validators.minLength(50)] ],
      category: ['', [Validators.required] ],
      postImg: ['', [Validators.required]],
      content: ['', [Validators.required]]
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
    let splitted = form.category.split('-');
    const postData: Post = {
      title: form?.title,
      permalink: form?.permalink,
      category: {
          categoryId: splitted[0],
          category: splitted[1]
      },
      postImgPath: '',
      excerpt: form?.excerpt,
      content: form?.content,
      isFeatured: false,
      views: 0,
      status: 'New Post',
      createdAt: new Date()
    }

    this.postService.upLoadImage(this.seletedImg, postData, this.formStatus, this.docId);
    this.form.reset();
    this.imgSrc = './assets/placeholder.jpg';
  }

  onTitleChanges($event: any) {
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g,'-');
  }

  ngOnInit(): void {

/*     this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', [Validators.required]],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', [Validators.required]],
      postImg: ['', [Validators.required]],
      content: ['', [Validators.required]]
    }); */
  
    this.route.queryParams.subscribe(val => {
      let id = val["id"];
      this.docId = id;
      console.log(this.docId);
      
      if (id){
        this.postService.loadOneData(id).subscribe(post => {
          this.post = post;
          console.log(this.post);
    
          this.form.patchValue({
            title: this.post?.title || '',
            permalink: this.post?.permalink || '',
            excerpt: this.post?.excerpt || '',
           // category: [`${this.post?.category.categoryId}-${this.post?.category.category} ` || ''],
            content: this.post?.content || ''
          });
          if (this.post?.category) {
            this.form.get('category')?.patchValue(`${this.post?.category.categoryId}-${this.post?.category.category}`);
          }
          this.imgSrc = this.post?.postImgPath;
    
          this.formStatus = 'Edit';
        });
      }
      
    });
  

   this.categoriesServices.LoadData().subscribe( cat => {
    this.categories = cat;
    
   } );
  }


}
