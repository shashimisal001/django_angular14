import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MasterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    MasterRoutingModule
  ],
  providers: [],
  bootstrap: [MasterComponent]
})
export class MasterModule { }
