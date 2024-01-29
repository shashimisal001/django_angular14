import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CheckoutApiService } from "../http/checkout-api.service";
import { HelperService } from "src/app/common/services/helper.service";
import { AuthService } from "src/app/common/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    templateUrl: "login.component.html",
    styleUrls: ["login.component.scss"]
})

export class LoginComponent {
    loginForm!: FormGroup;

    constructor(private checkoutApiService: CheckoutApiService,
        private helpService: HelperService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute){}

    ngOnInit(){
        this.authService.checkAndNavigate(['/products']);
        this.setLoginForm();
    }

    setLoginForm(){
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });
    }

    isValid(controlName: string, ruleName: string){
        let controlObj = this.loginForm.get(controlName);
        return controlObj?.errors?.[ruleName] && controlObj?.touched;
    }

    onSubmit(){
        this.loginForm.markAllAsTouched();
        let data = { "email": this.loginForm.value["email"], "password": this.loginForm.value["password"] }
        this.checkoutApiService.login(data).subscribe({
            next: (response: any) => {
                this.helpService.successMsg(response["msg"]);
                this.authService.setUserJwt(response["jwt"]);
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);
            }
        });
    }
}