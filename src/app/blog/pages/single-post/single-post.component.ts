import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  post!: any;
  postSimilars!: any[];
  idPost: string = '';

  constructor( private postService: PostService, private route: ActivatedRoute ){}


/*   loadSimilars(categoryId: any){
    this.postService.LoadSimilar(categoryId).subscribe(posts => {
      this.postSimilars = posts;
    })
  } */

  ngOnInit(): void {
    this.route.params.subscribe(val =>{
      this.postService.LoadById(val?.['id']).then( (post: any) => {
        this.idPost = val?.['id'];
        this.postService.LoadById(val?.['id']).then( (post: any) => {
          this.post = post;
          this.postService.LoadSimilar(this.post.category.categoryId).subscribe(posts => {
            this.postSimilars = posts;
          });
        });
      });
    });
 
  }
 
}
