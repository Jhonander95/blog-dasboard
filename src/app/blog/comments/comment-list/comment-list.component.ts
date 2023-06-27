import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  comments!: any[];

  constructor( private commentsServices: CommentsService ){}

  @Input() idPost: any;


  ngOnInit(): void {
    setInterval(() => {
      this.commentsServices.LoadComments(this.idPost).subscribe( res => {
        this.comments = res;
      } )
    }, 2000);
    
  }

}
 