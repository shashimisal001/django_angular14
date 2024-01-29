import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ObservableInput, catchError } from "rxjs";
import { HelperService } from "./services/helper.service";
import { AuthService } from "./services/auth.service";

@Injectable({
  providedIn: "root"
})

export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,
    private authService: AuthService,
    private helperService: HelperService) { }

  errorHandler(error: HttpErrorResponse): ObservableInput<any>{
    // Do something with the error
    if (error instanceof HttpErrorResponse) {
      if(error.status == 401){
        this.helperService.errorMsg("Unauthorized access or your session expired. Please login again.");
        this.authService.freshLogin();
      } else {
        this.helperService.errorMsg(error.message);
      }
    }
    throw error;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
    return next.handle(request).pipe(
      catchError((error) => this.errorHandler(error))
      );
  }
}