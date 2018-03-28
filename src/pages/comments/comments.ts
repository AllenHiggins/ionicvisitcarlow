import { Component } from '@angular/core';
import { 
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ToastController,
  Platform,
  ViewController 
} from 'ionic-angular';
import { logInPage } from '../logIn/logInPage';
import { User } from '../../models/user';
import { RegesterUserPage } from '../regester-user/regester-user';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/app';
//import {AuthCredential} from '@firebase/auth-types';


import { Observable } from 'rxjs/Observable';
import { GooglePlus } from '@ionic-native/google-plus';
import { UsercommentsProvider } from '../../providers/usercomments/usercomments';

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  list: any = [];
  id:number;
  numOfComments: number = 0;
  commentsList: any = [];
  userOb: Observable<firebase.User>;
  user = {} as User;
  btnText: string = "LogIn";
  isLoggedIn: boolean = false;
  logInSelected: boolean = false;
  userComment: boolean = false;
  userCommentsList: any = [];
  hasCommentted: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ModalController:ModalController,
    public authProvider: AuthProvider,
    public toast:ToastController,
    public AngularFireAuth: AngularFireAuth,
    public platform: Platform,
    public gplus: GooglePlus,
    public ViewController: ViewController,
    public UsercommentsProvider: UsercommentsProvider,
    public Storage: Storage,
    public http: HttpClient
  
  ) {
    this.userOb = this.AngularFireAuth.authState; 
  }

  getAllComments(){
    this.UsercommentsProvider.getComments(this.id).subscribe(response =>{
      this.commentsList = response;
      this.commentsList = this.commentsList.Comments;
      this.numOfComments = this.commentsList.length;
      console.log("comments --->> : ", this.commentsList);
    });
  }

  ionViewWillLoad(){
    console.log('ionWillLoad CommentsPage'); 
    this.id = this.navParams.get('id');
    this.user.rating = 1;
    this.getAllComments();
    this.getUserlogginStatus().then((respone) => {
      this.isLoggedIn = respone;
      console.log("logged in ==== : ", this.isLoggedIn);
    });
  }

  getUserlogginStatus(){
    return this.Storage.get('loggin')
    .then((list) =>{
      this.list = list == null ? [] : list;
      return this.list;
    });
  }

  ionViewDidLoad() {
     console.log('ionViewDidLoad CommentsPage'); 
  }

  makeCommentRating(){
   // if logged in
      // this.UsercommentsProvider.addComment
   // else
      // need to log in... 
  }

  close(){
    this.logInSelected = false;
  }

  goToLogin(){
    if(this.isLoggedIn){
      if(this.platform.is('cordova')){
        this.gplus.logout();
        this.Storage.set('loggin', false);
        this.isLoggedIn = false;
        console.log("======= ",this.isLoggedIn);
        this.btnText = "LogIn";
        this.user.logIn = false;
        this.user.email = '';
        this.user.password = '';
        this.logInSelected = false;
        this.userComment = false; 
      }
      this.webLogOut();
      this.toast.create({
        message: "Logged Out",
        duration: 4000
      }).present();
    }else{
      this.logInSelected = true;
    }
  }

  webLogOut(){
    this.gplus.logout();
    this.Storage.set('loggin',false);
    this.isLoggedIn = false;
    console.log("======= ",this.isLoggedIn);
    this.btnText = "LogIn";
    this.user.logIn = false;
    this.user.email = '';
    this.user.password = '';
    this.logInSelected = false;
    this.userComment = false; 
  }

  async logIn(user: User){
      try{
        const result = await this.authProvider.userLogIn(user);
        if(result.email && result.uid){
          this.user.logIn = true;
          this.userComment = true;
          this.btnText = "logOut";
          this.logInSelected = false;
          this.Storage.set('loggin', true);
          this.isLoggedIn = true;
          this.toast.create({
            message: "LogIn Successful",
            duration: 4000
          }).present();
        }else{
          this.user.logIn = false;
          this.user.logIn = false;
          this.userComment = false;
          this.toast.create({
            message: "Sorry, unable to LogIn at this time.",
            duration: 3000
          }).present();
        }
      }catch(e){
        console.log("====",e);
        this.isLoggedIn = false;
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

/////////////////////////////////////////////////////////////////////////////////
  comment(user: User){
    if(user.comment == null){
      this.toast.create({
        message: "Plase enter a comment",
        duration: 3000
      }).present();
    }else{

      // get comment from db in order of latest date frist - top 10

      this.http.post("http://inframe.pythonanywhere.com/listing/comments/add",{
        comment: user.comment,
        listID: this.id,
        rating: user.rating
      }).subscribe(
        res => {
          console.log(res);
          let date = new Date;
          this.userComment = false;
          let comments = {
            comment:user.comment,
            datatime:date,
            rating:user.rating
          }
          // to top of list (unshift) instead of push
          this.commentsList.unshift(comments);
          console.log(comments);
          this.toast.create({
            message: "Comment successful",
            duration: 3000
          }).present();
          //this.getAllComments();  
        },
        err => {
          console.log("Error occured");
          this.toast.create({
            message: "Sorry, your comment could not be posted at this time",
            duration: 3000
          }).present();
        }
      ); 
    }
  }

  commentToggle(){
    this.user.comment = "";
    this.user.rating = 1;
    this.userComment = !this.userComment;
  }

 /* async logInGoogle(){
      try{
        const gplusUser = await this.gplus.login({
          'webClientId': '1001239315906-3260jiiieunkfl4uk5tlfisnrpp72d2a.apps.googleusercontent.com',
          'offline': true,
          'scopes': 'profile email'
        })

        const result = await this.AngularFireAuth.auth.signInWithCredential(
          firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
        )

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
  }*/

  closeModal(){
    this.ViewController.dismiss();
  }

  counter(i: any){ 
    return new Array(parseInt(i));
  }

}
