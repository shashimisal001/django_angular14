import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "src/app/common/services/auth.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root"
})

export class MyAccountApiService {
    userJwt: string | boolean | null = "";
    constructor(private authService: AuthService,
        private httpClient: HttpClient){
    }

    getOrdersByUser(){
        let token: string = "Bearer "+String(this.authService.getJwt());
        let headers: HttpHeaders = new HttpHeaders()
                        .set("Content-Type", "application/json")
                        .set("Authorization", token);
        let url = environment.apiUrl+"/api/orders"
        return this.httpClient.get(url, { headers: headers })
    }

    getCustomerProfile(){
        let token: string = "Bearer "+String(this.authService.getJwt());
        let headers: HttpHeaders = new HttpHeaders()
                        .set("Content-Type", "application/json")
                        .set("Authorization", token);
        let url = environment.apiUrl+"/api/read_user_token"
        return this.httpClient.get(url, { headers: headers })
    }

    getOrderDetail(orderId: number){
        let url = environment.apiUrl+"/api/orders/"+orderId;
        let token: string = "Bearer "+String(this.authService.getJwt());
        let headers: HttpHeaders = new HttpHeaders()
                        .set("Content-Type", "application/json")
                        .set("Authorization", token);
        return this.httpClient.get(url, { headers: headers })
    }
}