import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ToastController,Platform } from 'ionic-angular';
import { logInPage } from '../logIn/logInPage';
import { User } from '../../models/user';
import { RegesterUserPage } from '../regester-user/regester-user';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  userOb: Observable<firebase.User>;

  user = {} as User;
  btnText: string = "LogIn";
  logInSelected: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ModalController:ModalController,
    public authProvider: AuthProvider,
    public toast:ToastController,
    public AngularFireAuth: AngularFireAuth,
    public platform: Platform,
    public gplus: GooglePlus
  
  ) {
    this.userOb = this.AngularFireAuth.authState;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage'); 
  }

  close(){
    this.logInSelected = false;
  }

  goToLogin(){
    if(this.user.logIn){
      if(this.platform.is('cordova')){
        this.gplus.logout();
      }
      this.btnText = "LogIn";
      this.user.logIn = false;
      this.user.email = '';
      this.user.password = '';
      this.logInSelected = false;
      this.toast.create({
        message: "Logged Out",
        duration: 4000
      }).present();
    }else{
      this.logInSelected = true;
    }
  }

  async logIn(user: User){
      try{
        const result = await this.authProvider.userLogIn(user);
        if(result.email && result.uid){
          this.user.logIn = true;
          this.toast.create({
            message: "LogIn Successful",
            duration: 4000
          }).present();
          this.btnText = "logOut";
          this.logInSelected = false;
        }else{
          this.user.logIn = false;
          this.toast.create({
            message: "Sorry, unable to LogIn at this time.",
            duration: 3000
          }).present();
        }
      }catch(e){
        console.log("====",e);
        this.user.logIn = false;
        this.toast.create({
          message: "Sorry, unable to LogIn at this time.",
          duration: 3000
        }).present();
       
      }
      console.log(this.user.logIn);
  }

  register(){
    const modal = this.ModalController.create("RegesterUserPage");
    modal.present();
  }

  async logInGoogle(){
      try{
        const gplusUser = await this.gplus.login({
          'webClientId': '1001239315906-3260jiiieunkfl4uk5tlfisnrpp72d2a.apps.googleusercontent.com',
          'offline': true,
          'scopes': 'profile email'
        });

        const result = await this.AngularFireAuth.auth.signInWithCredential(
          firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken) 
        );

        if(result){
          this.user.logIn = true;
          this.toast.create({
            message: "LogIn Successful",
            duration: 4000
          }).present();
          this.btnText = "LogOut";
          this.logInSelected = false;
        }
        
      }catch(e){
        console.log(e);
        this.user.logIn = false;
        this.toast.create({
          message: "Sorry, unable to LogIn at this time.",
          duration: 3000
        }).present();
      }
  }

}
