import { Component, OnInit, Optional } from '@angular/core';  
import { CartService } from '../cart.service';  
import { Product } from 'src/app/models/product';  
import { Observable } from 'rxjs';

@Component({  
  selector: 'app-cart-view',  
  templateUrl: './cart-view.component.html',  
  styleUrls: ['./cart-view.component.css']  
})  
export class CartViewComponent implements OnInit {


  cartItems: Product[] = [];  
  totalPrice: number = 0;  

  constructor(private cartService: CartService) { }  

  ngOnInit(): void {  
    this.cartService.getCartItems().subscribe(data => {  
      this.cartItems = data;  
      this.totalPrice = this.getTotalPrice(); // Calculate the total price after loading cart items  
    });  
  }  

  getTotalPrice(): number {  
    let total = 0;  
    this.cartItems.forEach(item => {  
      total += item.price; // Accumulate the total price  
    });  
    return total; // Return the calculated total price  
  }
  
  clearCart():void{
    this.cartService.clearCart().subscribe();
    }  

  checkout():void{
    this.cartService.checkout(this.cartItems).subscribe();
  }
  
}