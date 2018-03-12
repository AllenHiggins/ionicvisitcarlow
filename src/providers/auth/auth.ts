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
      const result = await this.AFireAuth.auth.signInWithEmailAndPassword(user.email,user.password);
      console.log(result); 
      return result;  
    }catch(e){
      return e;
    }
  }

  async registerANewUser(user: User){
    try{
      const result = await this.AFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result); 
      return result;    
    }catch(e){
      return e;
    }
  }

}
