import { Component } from '@angular/core';
import { 
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ToastController,
  Platform,
  ViewController,
  AlertController 
} from 'ionic-angular';
import { logInPage } from '../logIn/logInPage';
import { User } from '../../models/user';
import { RegesterUserPage } from '../regester-user/regester-user';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { ReportcommentProvider } from '../../providers/reportcomment/reportcomment';


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
  reportList: any;
  likeList: any = [];
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
  likeCommentIcon: boolean;
  isReported: boolean;
  TReport: boolean = false;
  likesRep: any;
  like: boolean;
  changePassword: boolean;

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
    public http: HttpClient,
    public reportcommentProvider: ReportcommentProvider,
    private alertCtrl: AlertController
  ) {
    this.userOb = this.AngularFireAuth.authState; 
  }

  checkToken(){
    this.hasCommentted = false;
    this.Storage.get("code").then(result =>{ 
      for(var i = 0; i < this.commentsList.length; i++){
        if(this.commentsList[i].userID == result){
          this.hasCommentted = true;
        }
      }
    });
  }

  getAllComments(){
    this.UsercommentsProvider.getComments(this.id).subscribe(response =>{
      this.commentsList = response;
      this.commentsList = this.commentsList.Comments;
      this.numOfComments = this.commentsList.length;
      console.log("comments --->> : ", this.commentsList);
      this.checkToken();
    });
  }

  ionViewWillLoad(){
    this.id = this.navParams.get('id');
    this.user.rating = 1;
    this.getAllComments();
    this.getUserlogginStatus().then((respone) => {
      this.isLoggedIn = respone;
    });
    this.reportcommentProvider.getReportList().then(response =>{
      this.reportList = response;
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

  close(){
    this.logInSelected = false;
  }

  goToLogin(){
    if(this.isLoggedIn){
      if(this.platform.is('cordova')){
        this.gplus.logout();
        this.Storage.set('loggin', false);
        this.isLoggedIn = false;
        this.btnText = "LogIn";
        this.user.logIn = false;
        this.user.email = '';
        this.user.password = '';
        this.logInSelected = false;
        this.userComment = false; 
        this.user.name = "";
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
          // store result.uid
          console.log("display Name: ",result.displayName);
          this.Storage.remove("code");
          this.Storage.set("code",result.uid); 
          this.user.logIn = true;
          this.Storage.set("name", result.displayName);
          this.userComment = true;
          this.btnText = "LogOut";
          this.logInSelected = false;
          this.Storage.set('loggin', true);
          this.isLoggedIn = true;

          this.checkToken();

          this.toast.create({
            message: "LogIn Successful",
            duration: 4000
          }).present();
        }else{
          this.user.logIn = false;
          this.user.name = "";
          this.isLoggedIn = false;
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
  }

  register(){
    const modal = this.ModalController.create("RegesterUserPage");
    modal.present();
  }

  comment(user: User){
    if(user.comment == ''){
      this.toast.create({
        message: "Plase enter a comment",
        duration: 3000
      }).present();
    }else{
      this.Storage.get("code").then(code =>{ 
          let userLoggedIn = this.AngularFireAuth.auth.currentUser;
          this.http.post("http://inframe.pythonanywhere.com/listing/comments/add",{
            comment: user.comment,
            listID: this.id,
            rating: user.rating,
            userID: code,
            likes: 0,
            name: userLoggedIn.displayName
          }).subscribe(
            res => {
              let date = new Date;
              this.userComment = false;
              let comments = {
                comment:user.comment,
                datatime:date,
                rating:user.rating,
                likes:0,
                name: userLoggedIn.displayName
              }
              this.commentsList.unshift(comments);
              this.numOfComments = 1;

              this.hasCommentted = true;

              this.toast.create({
                message: "Comment successful",
                duration: 3000
              }).present(); 
            },
            err => {
              console.log("Error occured");
              this.toast.create({
                message: "Sorry, your comment could not be posted at this time",
                duration: 3000
              }).present();
            }
          );
      }); 
    }
  }
  
  commentToggle(){
    this.user.comment = "";
    this.user.rating = 1;
    this.userComment = !this.userComment;
  }

 async logInGoogle(){
      try{
        const gplusUser = await this.gplus.login({
          'webClientId': '1001239315906-3260jiiieunkfl4uk5tlfisnrpp72d2a.apps.googleusercontent.com',
          'offline': true,
          'scopes': 'profile email'
        })

        const result = await firebase.auth().signInWithCredential(
          firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
        )

        if(result.email && result.uid){

          // Updates the user attributes:
          let userLoggedIn = this.AngularFireAuth.auth.currentUser;
          userLoggedIn.updateProfile({
            displayName: result.displayName,
            photoURL: null
          }).then(function() {
            // Profile updated successfully!
            let displayName = userLoggedIn.displayName;
            if(displayName != null){
              this.Storage.set("name", result.displayName);
            }else{
              this.Storage.set("name", "Visit Carlow User");
            }
          }, function(error) {
            // An error happened.
            console.log(error);
          });
          this.Storage.set("code",result.uid); 
          this.user.logIn = true;
          this.userComment = true;
          this.btnText = "LogOut";
          this.logInSelected = false;
          this.Storage.set('loggin', true);
          this.isLoggedIn = true;

          this.checkToken();

          this.toast.create({
            message: "LogIn Successful",
            duration: 3000
          }).present();
        }
      }catch(e){
        console.log(e);
        this.user.logIn = false;
        this.isLoggedIn = false;
        this.userComment = false;
        this.user.name = "";
        this.toast.create({
          message: "Sorry, unable to LogIn at this time.",
          duration: 3000
        }).present();
      }
  }

  closeModal(){
    this.ViewController.dismiss();
  }

  counter(i: any){ 
    return new Array(parseInt(i));
  }

  toggelReportOption(){
    this.TReport = !this.TReport;
  }

  report(id){
    let alert = this.alertCtrl.create({
      title: 'Report Comment',
      message: 'Are you sure that you would like to report this comment?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Report',
          handler: () => {
             console.log('report comment clicked');
             this.isReported = false;
             for(var i = 0; i < this.reportList.length; i++){
               if(this.reportList[i] == id){
                 this.isReported = true;
               }
             }  
             if(this.isReported){
               this.toast.create({
                 message: "You have already Reported this comment",
                 duration: 3000
               }).present();
             }else{
               this.reportcommentProvider.report(id);
             } 
          }
        }
      ]
    });
    alert.present();
  }

  async fPassword(email){
    try{
      const result = await this.authProvider.forgotPassword(email);
      console.log(result.code);
      const rep = result.code;
      return rep;
    }catch(e){
      console.log(e);
    } 
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Reset Password',
      inputs: [
        {
          name: 'Email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Reset',
          handler: data => {
            if (data.Email.trim()) {
              this.fPassword(data.Email.trim()).then((res)=>{
                console.log("res ", res);
                if(res == "auth/invalid-email"){    
                   this.msgPrompt("Invalid Email", "Check the email address that you entered is correct", "Ok"); 
                   return false;
                }else if(res == "auth/network-request-failed"){
                  this.msgPrompt("Sorry", "Cannot send a reset email at this time", "Ok");
                  return false;
                }else if(res == "auth/user-not-found"){
                  this.msgPrompt("Sorry", "Cannot send a reset email at this time", "Ok");
                  return false;
                }else{
                  this.msgPrompt("Email Sent", "Check your email to continue to change your password", "Ok");    
                }
            });
              
            } else {
              this.msgPrompt("Sorry", "Cannot send a reset email at this time", "Ok");
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  msgPrompt(title, msg, btn) {
    let alert = this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: [btn]
    });
    alert.present();
  }



}
