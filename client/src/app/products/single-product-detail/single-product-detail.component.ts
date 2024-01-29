import { Component, Injectable } from "@angular/core";
import { ProductsApiService } from "../http/products-api.service";
import { ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
import { CartService } from "src/app/common/services/cart.service";
import { HelperService } from "src/app/common/services/helper.service";

@Component({
  templateUrl: './single-product-detail.component.html',
  styleUrls: ['./single-product-detail.component.scss']
})
export class SingleProductDetailComponent {
  apiUrl:string = environment.apiUrl;
  productId: number = 0;
  product: any = [];
  products: any = [];
  qty: number = 1;

  constructor(private productsApiService: ProductsApiService, 
    public cartService: CartService, 
    private route: ActivatedRoute,
    private helperService: HelperService){
      this.listenToRouteChanges();
  }
  
  ngOnInit(){
    this.setProduct();
  }

  listenToRouteChanges(){
    this.route.params.subscribe( 
      params => {
        this.productId = params["productId"];
        this.setProduct();
        this.helperService.moveToTop(500);
      }
    );
  }

  setProduct(){
    this.productsApiService.getSingleProduct(this.productId).subscribe({
      next: (response:any) => {
        this.product = response['data'];
      }
    });
  }
}
