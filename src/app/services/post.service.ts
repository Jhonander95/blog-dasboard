import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor( private storage: AngularFireStorage,
               private db: AngularFirestore,
               private toastr: ToastrService,
               private route: Router
               ) 
  { }


  upLoadImage(seletedImg: any, postData: any, formStatus: any, id: any){
    const filePath = `postIMG/${Date.now()}`
    console.log(filePath);
    
    this.storage.upload(filePath, seletedImg).then(  () => {
      console.log('post image uploaded successfully');

      this.storage.ref(filePath).getDownloadURL().subscribe( URL => {
        postData.postImgPath = URL;

        if(formStatus == 'Edit'){
          this.updateData(id, postData);
        } else {
          this.saveData(postData);
        }
        

      });
      
    });

  }

  saveData(postData: any){
    this.db.collection('post').add(postData).then( () => {
      this.toastr.success('Post Insert Successfully');
      this.route.navigate(['/posts']);
    } );
  }

  loadData() {
    return this.db.collection('post').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {

          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {data, id}
        });
      })
    );
  }

  loadOneData(id: any) {
    return this.db.doc(`post/${id}`).valueChanges();
  }

  updateData(id: any, postData: any){
    this.db.doc(`post/${id}`).update(postData).then(() => {
      this.toastr.success('Data Updated Successfully');
      this.route.navigate(['/posts']);
    });
  }

  deleteImage(pathImage: any, id: any){
    this.storage.storage.refFromURL(pathImage).delete().then(()=> {
      this.deleteData(id);
    });
  }

  deleteData(id: any) {
    this.db.doc(`post/${id}`).delete().then( () => {
      this.toastr.warning('Data Deleted..!');
    });
  }

  markFeatured(id: any, featured: any) {
    this.db.doc(`post/${id}`).update(featured).then(()=> {
      this.toastr.success('Featured Update Successfully!!');
    });
  }

}
