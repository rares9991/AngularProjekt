import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Food } from '../model/food';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) { }

  //add food
  addFood(food: Food){
    food.id = this.afs.createId();
    return this.afs.collection('/ShoppingCart').add(food);
  }

  //get the whole Shopping Cart
  getShoppingCart(){
    return this.afs.collection('/ShoppingCart').snapshotChanges();
  }

  //delete some food
  deleteFood(food: Food){
    return this.afs.doc('/ShoppingCart/'+food.id).delete();
  }
  
  //update some food
  updateFood(food: Food){
    this.deleteFood(food);
    this.addFood(food);
  }
}
