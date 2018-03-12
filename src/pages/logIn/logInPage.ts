import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { RegesterUserPage } from '../regester-user/regester-user';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { CommentsPage } from '../comments/comments';

@IonicPage()
@Component({
  selector: 'page-logInPage',
  templateUrl: 'logInPage.html',
})
export class logInPage {

  user = {} as User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ModalController: ModalController,
    public authProvider: AuthProvider,
    public toast:ToastController,
    public AngularFireAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsercommentsPage');
  }

  register(){
    const modal = this.ModalController.create("RegesterUserPage");
    modal.present();
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
          this.navCtrl.push(CommentsPage,{ data: user });
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

 // logInWithGoogle(){
 //   this.fire.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
 //   .then( res => {
 //     console.log(res);
 //   });
 // }

}
