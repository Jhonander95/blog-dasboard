import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor( private db: AngularFirestore,
               private toastr: ToastrService) { }


    saveCategories(categoryData: Category){
      this.db.collection('categories').add(categoryData).then( docRef => {
        this.toastr.success('Data Insert Successfully!!');
      })
      .catch(err => { console.log(err);
       } )
    }

    LoadData() {
      return this.db.collection('categories').snapshotChanges().pipe(
        map( actions => {
          return actions.map( a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data }
          })
        })
      )
    }

    updateCategory(data: any, id: string) {

      this.db.collection('categories').doc(id).update(data).then( docRef => {
        this.toastr.success('Data Update Successfully!!');
      })

    }

    deleteCategory(id: string) {
      this.db.collection('categories').doc(id).delete().then( docRef => {
        this.toastr.success('Data Deleted Successfully!!');
      })
    }

}
