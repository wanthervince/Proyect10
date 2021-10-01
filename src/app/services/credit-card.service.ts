import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { creditCard } from '../models/creditCard';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  private _card = new Subject<any>();

  constructor(private firesStore: AngularFirestore) {}

  setCreditCard(card: creditCard): Promise<any> {
    return this.firesStore.collection('cards').add(card);
  }
  getCreditCard(): Observable<any> {
    return this.firesStore.collection('cards').snapshotChanges();
  }
  deleteCreditCard(id: string): Promise<any> {
    return this.firesStore.collection('cards').doc(id).delete();
  }

  addCreditCardEdit(card: creditCard) {
    this._card.next(card);
  }
  getCreditCardEdit(): Observable<creditCard> {
    return this._card.asObservable();
  }
  updateCreditCard(id: string, card: any): Promise<any> {
    return this.firesStore.collection('cards').doc(id).update(card);
  }
}
