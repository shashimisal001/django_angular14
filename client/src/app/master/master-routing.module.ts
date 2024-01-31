import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { CartComponent } from '../cart/cart.component';
import { AuthRouteGuard } from '../common/routeguards/auth.routeguard';

export const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("../index/index.module").then(x=>x.IndexModule)
  },
  {
    path: "about-us",
    component: AboutComponent,
    data: {
      title: "About us",
      subtitle: "Get to know us"
    }
  },
  {
    path: "products",
    loadChildren: () => import('../products/products.module').then(m => m.ProductsModule)
  },
  {
    path: "cart",
    loadChildren: ()=>import("../cart/cart.module").then(x=>x.CartModule)
  },
  {
    path: "checkout",
    loadChildren: () => import('../checkout/checkout.module').then(m => m.CheckoutModule)
  },
  {
    path: "my-account",
    loadChildren: () => import("../my-account/my-account.module").then(x=>x.MyAccountModule),
    canActivate: [AuthRouteGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})

export class MasterRoutingModule {

}