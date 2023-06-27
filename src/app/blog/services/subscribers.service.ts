import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Sub } from '../models/sub';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor( private db: AngularFirestore ) { }

  addSubs(data: any) {
    this.db.collection('subscribers').add(data).then(subs => {
      console.log('subscription saved successfully');
    })
  }

  checkSubs(emailSub: any){
    return this.db.collection('subscribers', ref => ref.where('email', '==', emailSub)).get()
  }

}
