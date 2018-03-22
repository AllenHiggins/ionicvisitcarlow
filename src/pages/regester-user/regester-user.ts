import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-regester-user',
  templateUrl: 'regester-user.html',
})
export class RegesterUserPage {

  user = {} as User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegesterUserPage');
  }

  async register(user: User){
    try{
      const result = await this.authProvider.registerANewUser(user);
      console.log(result);

      if(result.email && result.uid){
        this.toast.create({
          message: "Registration Successful. Plase login to continue.",
          duration: 4000
        }).present();
        this.navCtrl.pop();
      }else{
        this.toast.create({
          message: "Sorry, unable to Registration at this time.",
          duration: 3000
        }).present();
      }
    }catch(e){
      console.log("+++",e);
      this.toast.create({
        message: "Sorry, unable to Registration at this time.",
        duration: 3000
      }).present();
    }
  
  }

  cancel(){
    this.navCtrl.pop();
  }

}
