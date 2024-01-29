import { Component } from "@angular/core";
import { MyAccountApiService } from "./http/my-account-api.service";

@Component({
    templateUrl: "my-account.component.html",
    styleUrls: ["my-account.component.scss"]
})

export class MyAccountComponent {
    orders: any = [];
    profile: any = {};
    constructor(private myAccountApiService: MyAccountApiService){

    }

    ngOnInit(){
        this.setOrders();
        this.setCustomerProfile();
    }

    setCustomerProfile(){
        this.myAccountApiService.getCustomerProfile().subscribe({
            next: (response: any)=>{
                this.profile = response["user"];
            }
        });
    }
    
    setOrders(){
        this.myAccountApiService.getOrdersByUser().subscribe({
            next: (response: any)=>{
                this.orders = response["data"];
            }
        })
    }
}