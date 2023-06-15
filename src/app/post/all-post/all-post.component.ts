import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.scss']
})
export class AllPostComponent implements OnInit {

  constructor(private postService: PostService){}

  postArray: any = [];



  onDelete(postImgPath: any, id: string) {
   this.postService.deleteImage(postImgPath, id);
  }

  onFeatured(id: any, featured: any){

    const featuredData = {
      isFeatured: featured
    }

    this.postService.markFeatured(id, featuredData);
  }


  ngOnInit(): void {
    this.postService.loadData().subscribe( posts => {
      this.postArray = posts;
      console.log(this.postArray);
      
    })
  }


}
