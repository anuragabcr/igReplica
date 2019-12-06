import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        var token = this.authService.getAuthToken();
        let authRequest = req;
        if(token) {
            authRequest = req.clone({
                headers: req.headers.set('x-auth-token', token)
            });
        }
        return next.handle(authRequest);
    }

}