import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MyAccountApiService } from "../http/my-account-api.service";

@Component({
    templateUrl: "order-detail.component.html",
    styleUrls: ["order-detail.component.scss"]
})

export class OrderDetailComponent {
    orderId: number | null = null;
    products: any = []
    summary: any = {}
    constructor(private route: ActivatedRoute,
        private myAccountApiService: MyAccountApiService){}

    ngOnInit(){
        this.listenToRouteChanges();
    }

    listenToRouteChanges(){
        this.route.params.subscribe({
            next: (params)=>{
                this.orderId = params["orderId"];
                this.setOrderDetail();
            }
        });
    }

    setOrderDetail(){
        this.myAccountApiService.getOrderDetail(Number(this.orderId)).subscribe({
            next: (response: any) => {
                this.products = response["data"]["products"];
                this.summary = response["data"]["summary"];
            }
        })
    }
}