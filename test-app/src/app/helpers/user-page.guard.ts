import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountServiceService } from 'src/services/account-service.service';


@Injectable({ providedIn: 'root' })
export class UserPageGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountServiceService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
        const user = this.accountService.userValue;
        if (user.groups === "Admin") {
            return true;
        }

        this.router.navigate([''], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
