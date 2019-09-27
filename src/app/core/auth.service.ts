import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { auth, User } from 'firebase/app';
import { Observable, EMPTY, of } from 'rxjs';
import { flatMap, switchMap, take } from 'rxjs/operators';
import { AppUser } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<AppUser>;

  // stateful data of the user currently logged in
  user: AppUser;

  constructor(public afAuth: AngularFireAuth,
              public db: AngularFireDatabase,
              public router: Router,
              public route: ActivatedRoute) {


        // we swithch from the auth record from the authentication provider, which retuns a bare bones auth record
        // we then do a query of our own '/users' collection, they are linked by using the same uid
        // the custom 'users' collection has some additional app specific data such as 'admin'
        //
        // By having the custom 'users' we can control the who can use the app.
        // 1. Use google to authenticate yourself (get user profile data)
        // 2. Map to user in 'users'

        this.user$ = afAuth.authState.pipe(
            switchMap(user => {
              if (user) {
                console.log('Current retrieved user from Google is ' + user.displayName);

                this.user = {
                  uid: user.uid,
                  displayName: user.displayName,
                  email: user.email,
                  photoURL: user.photoURL,
                };

                return this.db.object<AppUser>('users/' + user.uid).valueChanges();
              }
              return of(null);
          })
        );
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate['/'];
  }

  async loginWithGoogle() {

    // logging in with user here will result in the user being emitted onto the user$
    const provider = new auth.GoogleAuthProvider();
    const credentials =  await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credentials.user);
  }

  updateUserData(user: User): any {
    // Retrieve the user from our firebase collection
    // console.log('Retrieved user ' + user.displayName + ' from google');
    const savedUser: AngularFireObject<AppUser> = this.db.object<AppUser>('users/' + user.uid);

    savedUser.valueChanges().pipe(
      take(1)
    )
    .subscribe(retrievedUser => {


      // This user is not set up as a user in our system
      if (!retrievedUser) {
        console.log('Created user ' + user.displayName);
        savedUser.set({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          admin: false
        });

      // updating user
      } else {
        console.log('Updating user ' + user.displayName);

        const userData = {
          uid: retrievedUser.uid,
          email: retrievedUser.email,
          displayName: retrievedUser.displayName,
          photoURL: retrievedUser.photoURL
        };

        savedUser.update(userData);
      }
    });
  }

  get appUser$(): Observable<AppUser>  {
      return this.user$.pipe(
        flatMap(user => {
            if (user) {
              this.user = user;
              localStorage.setItem('user', JSON.stringify(this.user));
              // return this.userService.get(firebaseUser.uid).valueChanges();
            } else {
              this.user = null;
              localStorage.setItem('user', null);
            }
            return EMPTY;
          }
        )
      );
    }

    private get(uid: string): AngularFireObject<AppUser> {
      return this.db.object('/users/' + uid);
    }

  async login() {
    console.log('logging in....');
    await  this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    return this.router.navigate(['']);
  }

  async logout() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/admin/login']);
  }

  isLoggedIn() {
    if (this.user == null ) {
        return false;
      } else {
        return true;
      }
    }
}
