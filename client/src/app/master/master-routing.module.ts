import { RouterModule, Routes } from '@angular/router';
import { IndexComponet } from '../index/index.component';
import { NgModule } from '@angular/core';
import { AboutComponent } from '../about/about.component';

export const routes: Routes = [
  {
    path: "",
    component: IndexComponet,
    data: {
      title: "Shop in style",
      subtitle: "With this shop hompeage template"
    }
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
})

export class MasterRoutingModule {

}