import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentsService  {

  constructor( private db: AngularFirestore ) { }

  createComment(data: any){
    this.db.collection('comments').add(data).then( res => {
      console.log('comentario creado', res );
      
    });
  }

  LoadComments( idPost: any ) {
    return this.db.collection('comments', ref => ref.where('idPost', '==', idPost)).snapshotChanges().pipe(
      map( actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }

}
 