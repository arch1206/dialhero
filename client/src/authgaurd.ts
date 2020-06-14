import { Injectable } from "@angular/core";
import {  CanActivate, ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
} from "@angular/router";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { GlobleService } from "./service/globle.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(private service: GlobleService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.service.jwtVerify((a) => {
        if (a) {
          resolve(true);
        } else {
          this.router.navigate(["login"]);
        }
      });
    });
  }
}