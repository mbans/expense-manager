import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

    // Using the 'RouterStateSnapshot' we can get access to the url the user was accessing when the hit the page
    canActivate(route, state: RouterStateSnapshot): Observable<boolean> {

      // If the authService has a user assigned i.e. a user is logged in,
      // then we will return true and allow access, otherwise we redirect the user to the login page
      // The 'AuthGuard' is registered in the app.module.ts on the 'checkout' route
      return this.auth.user$.pipe(
        map(user => {
            if (user) {
              // if user is trying to hit the login screen whilst being logged in
              console.log('URL = ' + state.url);
              // if (state.url = '/admin/login') {
              //   this.router.navigate(['/entry']);
              // }
              console.log('User is logged in access allowed');
              return true;
            }

            console.log('Navigating to /admin/login');
            this.router.navigate(['/admin/login']);
            return false;
          }
        ) // map
      ); // pipe
    }
}
