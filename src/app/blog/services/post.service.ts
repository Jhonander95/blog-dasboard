import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import { Post } from '../models/post';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor( private db: AngularFirestore ) { }

  LoadFeatured() {
    return this.db.collection('post', ref => ref.where('isFeatured', '==', true).limit(4)).snapshotChanges().pipe(
      map( actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }

  LoadLatest() {
    return this.db.collection('post', ref => ref.orderBy('createdAt')).snapshotChanges().pipe(
      map( actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }

  LoadByCategory( categoryId: any ) {
    return this.db.collection('post', ref => ref.where('category.categoryId', '==', categoryId)).snapshotChanges().pipe(
      map( actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }

  LoadSimilar( categoryId: any ) {
    return this.db.collection('post', ref => ref.where('category.categoryId', '==', categoryId).limit(4)).snapshotChanges().pipe(
      map( actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }

  LoadById(postId: any) {
    const postRef = this.db.doc(`post/${postId}`).ref;
    return postRef.get().then((doc) => {
      if (doc.exists) {
        const post = doc.data() as Post;
        const updatedViews = post.views + 1;
        this.countViews(postId, updatedViews);
      }
      return doc.data();
    });
  }
  
  countViews(postId: any, views: any) {
    const postRef = this.db.doc(`post/${postId}`).ref;
    return postRef.update({ views: views });
  }

/* 
  LoadById( postId: any ) {
    return this.db.doc(`post/${postId}`).valueChanges();

  }


  countViews( postId: any, views: any  ){
    const postRef = this.db.doc(`post/${postId}`);
    return postRef.update({ views: views + 1 });
  }
 */


}
 