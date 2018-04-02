import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';

@Injectable()
export class AuthProvider {

  user = {} as User;

  constructor(
    public http: HttpClient,
    public AFireAuth: AngularFireAuth,
   ) {
    console.log('Hello AuthProvider Provider');
  }

  async userLogIn(user: User){
    try{
      const result = await this.AFireAuth.auth.signInWithEmailAndPassword(user.email.trim(),user.password.trim());
      console.log(result); 
      return result;  
    }catch(e){
      return e;
    }
  }

  async registerANewUser(user: User){
    try{
      const result = await this.AFireAuth.auth.createUserWithEmailAndPassword(user.email.trim(), user.password.trim());
      console.log(result); 
      let userLoggedIn = this.AFireAuth.auth.currentUser;
      // Updates the user attributes:
      userLoggedIn.updateProfile({
        displayName: user.name.trim(),
        photoURL: null
      }).then(function() {
        // Profile updated successfully!
        let displayName = userLoggedIn.displayName;
        console.log("User Name: ", displayName);
      }, function(error) {
        // An error happened.
        this.Storage.set("name", "Visit Carlow User");
        console.log(error);
      });
      return result;    
    }catch(e){
      return e;
    }
  }

  async forgotPassword(email){
    try{
      const result = await this.AFireAuth.auth.sendPasswordResetEmail(email);
      return result;
    }catch(e){
      return e;
    }
  }

}
