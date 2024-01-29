import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "src/app/common/services/auth.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class CheckoutApiService {
    constructor(private httpClient: HttpClient,
        private authService: AuthService){}
    
    registerCustomer(data:any){
        let url: string = environment.apiUrl+"/api/customers/register";
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.httpClient.post(url, data, { headers: headers });
    }

    login(data: {[key: string]: string}){
        let url: string = environment.apiUrl+"/api/customers/login";
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.httpClient.post(url, data, {headers: headers})
    }

    placeOrder(data: any){
        let url: string = environment.apiUrl+"/api/orders/create";
        let token: string = "Bearer "+String(this.authService.getJwt());
        let headers: HttpHeaders = new HttpHeaders()
                                    .set("Content-Type", "application/json")
                                    .set("Authorization", token);
        return this.httpClient.post(url, data, { headers: headers });
    }
}