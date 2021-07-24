import { Inject, Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router) {};

  canActivate() {
    if (this.authService.isLoggedIn()) {
      alert('oke');
      return this.route.navigate(['/dashboard']);
    }

    return !this.authService.isLoggedIn();
  }
}
