import { Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { CheckoutApiService } from "./http/checkout-api.service";
import { HelperService } from "../common/services/helper.service";
import { Router } from "@angular/router";
import { AuthService } from "../common/services/auth.service";

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent {
  checkoutForm!: FormGroup;
  showCheckoutButton: boolean = false;
  constructor(private checkoutApiService: CheckoutApiService,
    private helperService: HelperService,
    private authService: AuthService){}
  
  ngOnInit(){
    this.authService.checkAndNavigate(['checkout/review']);
    this.setCheckoutForm();
  }

  setCheckoutForm(){
    this.checkoutForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required]),
      password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
      mobileNumber: new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(10), Validators.pattern('[0-9]+$')]),
      address: new FormControl('', [Validators.required])
    }, { validators: this.passwordMatch} );
  }

  passwordMatch(c: AbstractControl): ValidationErrors | null {
    return c.get('password1')?.value !== c.get('password2')?.value ? {"passwordmatch": true} : null;
  }

  isValid(controlName: string, ruleName: string, level='control'){
    let controlObj: FormControl | AbstractControl | null = null;
    controlObj = level=='control' ? this.checkoutForm.get(controlName) : this.checkoutForm;
    return controlObj?.errors?.[ruleName] && controlObj.touched;
  }

  registerCustomer(){
    this.checkoutApiService.registerCustomer(this.checkoutForm.value).subscribe({
      next: (response: any) => {
        this.helperService.successMsg(response["msg"]);
        this.checkoutForm.reset();
      }
    });
  }

  onSubmit() {
    this.checkoutForm.markAllAsTouched();
    if(this.checkoutForm.valid){
      this.registerCustomer();
    }
  }
}