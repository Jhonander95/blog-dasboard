import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor( private db: AngularFirestore) { }


    saveCategories(categoryData: Category){
      this.db.collection('categories').add(categoryData).then( docRef => {
        console.log(docRef);
      })
      .catch(err => { console.log(err);
       } )
    }

}
