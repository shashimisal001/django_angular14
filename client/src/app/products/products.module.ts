import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SingleProductDetailComponent } from './single-product-detail/single-product-detail.component';
import { ProductsApiService } from './http/products-api.service';

@NgModule({
  declarations: [
    ProductsComponent,
    SingleProductDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgHttpLoaderModule.forRoot(),
    ProductsRoutingModule
  ],
  exports: [ProductsComponent],
  providers: [ProductsApiService],
  bootstrap: [ProductsComponent]
})
export class ProductsModule { }