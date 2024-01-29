import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductsApiService {
  constructor(private httpClient: HttpClient) { }

  getAllProducts(latestProducts: number, categoryId: number) {
    let httpParams = new HttpParams()
    .set("latestProducts", latestProducts)
    .set("categoryId", categoryId);

    let url: string = environment.apiUrl+"/api/products";
		return this.httpClient.get(url, { params: httpParams });
  }
  
  getSingleProduct(productId:number) {
    let url: string = environment.apiUrl+"/api/products/"+productId;
		return this.httpClient.get(url);
  }
}