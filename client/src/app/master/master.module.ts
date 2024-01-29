import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MessageModule } from '../common/components/message/message.module';
import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ErrorInterceptor } from '../common/interceptor';

@NgModule({
  declarations: [
    MasterComponent
  ],
  imports: [ 
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    MessageModule,
    MasterRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  }],
  bootstrap: [MasterComponent]
})
export class MasterModule { }
