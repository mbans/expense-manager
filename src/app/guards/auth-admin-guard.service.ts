import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthAdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

    // Using the 'RouterStateSnapshot' we can get access to the url the user was accessing when the hit the page
    canActivate(route, state: RouterStateSnapshot): Observable<boolean> {

      return this.auth.user$.pipe(
        map(user => {
            if (!user) {
              console.log('Navigating to /login');
              this.auth.login();
              return false;
           }

           console.log(user.displayName + ' admin=' + user.admin);

           if (user.admin) {
            return true;
           } else {
             return false;
           }
          }
        ) // map
      ); // pipe
    }
}
