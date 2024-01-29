import { Injectable } from "@angular/core";
import { HelperService } from "./helper.service";

@Injectable({
  providedIn: 'root'
})

export class CartService {
  constructor(private helperService: HelperService) { }

  addUpdateItem(product: any, qty: number = 1) {
    let cart = this.getCart();
    let index: number = this.helperService.filterObjectArray(cart, 'productId', product['id']);
    if (qty > 0) {
      if (index > -1) {
        cart[index].qty = qty;
      } else {
        cart.push({ productId: product['id'], product: product, qty: qty });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      this.helperService.successMsg('Item added to cart');
    } else {
      this.helperService.errorMsg('Quantity must be at least one.');
    }
    this.helperService.dataShareEvents.emit({ 'itemAdded': true });
  }

  removeItem(productId: number) {
    let cart = this.getCart();
    let index: number = this.helperService.filterObjectArray(cart, 'productId', productId);
    if (index > -1) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.helperService.dataShareEvents.emit({ 'itemRemoved': true });
      this.helperService.successMsg('Item removed from cart');
    }
  }

  clearCart() {
    localStorage.removeItem("cart");
    this.helperService.dataShareEvents.emit({ 'cartCleared': true });
    this.helperService.successMsg('Cart cleared');
  }

  getCart() {
    let localStorageData = localStorage.getItem('cart');
    let cartStr: string = localStorageData ? localStorageData : "[]";
    let cart = JSON.parse(cartStr);
    return cart;
  }

  getCartSummary(){
    let netTotal: number = 0;
    let gst: number = 0;
    let cart = this.getCart();
    console.log(cart);
    cart.forEach((value: any)=>{
      let eachNetTotal: number = value.product["discounted_rate"]*value.qty;
      netTotal += eachNetTotal;
      gst += (value.product["gst"]/100)*eachNetTotal;
    });
    return { netTotal: netTotal, gst: parseFloat(String(gst)).toFixed(2), grandTotal: netTotal+gst }
  }
}
