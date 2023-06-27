import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss']
})
export class SingleCategoryComponent implements OnInit {

  categoryId!: any;
  categoryName!: any;
  posts!: any[];

  constructor( private route: ActivatedRoute, private postService: PostService ){}

  ngOnInit(): void {
    
    this.route.params.subscribe( val => {
      this.categoryId = val?.['id'];
      this.categoryName = val?.['category']
      this.postService.LoadByCategory(this.categoryId).subscribe(post => {
        this.posts = post;
      })
    })

  }

}
