import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Food } from '../../model/food';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  shoppingCart: Food[] = [];
  foodObj : Food = {
    id : '',
    name :  '',
    price_per_kg :  '',
    price_per_piece :  '',
    quantity_kg : '',
    quantity_pieces: '',
  };

  id : string = '';
  name : string = '';
  price_per_kg : string = '';
  price_per_piece : string = '';
  quantity_kg : string = '';
  quantity_pieces: string = '';

  constructor(private auth : AuthService, private data: DataService){ }

  ngOnInit(): void {
    this.getShoppingCart();
  }

  //register(){
  //  this.auth.logout();
  //}

  getShoppingCart(){
    this.data.getShoppingCart().subscribe(res => {
      this.shoppingCart = res.map((e:any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err =>{
      alert('Error while fetching food data');
    })
  }

  resetForm(){
    this.id = '';
    this.name = '';
    this.price_per_kg = '';
    this.price_per_piece = '';
    this.quantity_kg = '';
    this.quantity_pieces = '';
  }

  addFood(){
    if(this.name == '' || this.quantity_kg == '' || this.quantity_pieces == '' || this.price_per_kg == '' || this.price_per_piece == '')
      alert('Fill all input fields');
    this.foodObj.id = '';
    this.foodObj.name = this.name;
    this.foodObj.price_per_kg = this.price_per_kg;
    this.foodObj.price_per_piece = this.price_per_piece;
    this.foodObj.quantity_kg = this.quantity_kg;
    this.foodObj.quantity_pieces = this.quantity_pieces; 

    this.data.addFood(this.foodObj);
    this.resetForm();
  }

  updateFood(){

  }

  deleteFood(food: Food){
    if(window.confirm('Are you sure you want to delete '+food.name+' ?')){
      this.data.deleteFood(food);
    }
  }
}
