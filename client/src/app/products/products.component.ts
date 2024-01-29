import { Component, Input } from "@angular/core";
import { ProductsApiService } from "./http/products-api.service";
import { environment } from "src/environments/environment";
import { CartService } from "../common/services/cart.service";

@Component({
  selector: 'products-component',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  @Input()
  blockHeading:string = "";
  @Input()
  latestProducts: string = "0";
  @Input()
  categoryId: string = "0"; 
  @Input()
  headingHr: string = "0";
  apiUrl:string = environment.apiUrl;
  products: any = []

  constructor(private productsApiService:ProductsApiService,
    public cartService: CartService){}

  ngOnInit(){
    this.productsApiService.getAllProducts(Number(this.latestProducts), Number(this.categoryId)).subscribe({
      next: (response:any)=>{
        this.products = response["data"]
      }
    });
  }
}
