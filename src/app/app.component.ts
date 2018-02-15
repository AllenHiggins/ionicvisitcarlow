import { Component, ViewChild } from '@angular/core';
import { Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SubpagePage } from '../pages/subpage/subpage';
import { ListingsPage } from '../pages/listings/listings';
import { EventsPage } from '../pages/events/events';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  list: any;

  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen) {
    this.initializeApp();
    
    const path = 'assets/imgs/';

    this.list =[
      {title:'Places',icon:path+"places.png"},
      {title:'Stay',icon:path+"stay.png"},
      {title:'See',icon:path+"see.png"},
      {title:'To Do',icon:path+"todo.png"},
      {title:'Eating Out',icon:path+"eat.png"},
      {title:'Events',icon:path+"event.png"},
      {title:'Shopping',icon:path+"shopping.png"},
      {title:'Useful Contacts',icon:path+"contacts.png"},
      {title:'Medical',icon:path+"medical.png"},
      {title:'Entertainment',icon:path+"enter.png"}
    ]

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
    ];

  }

  itemTapped(event,title) {

    //let title = event.target.textContent;
    console.log("----",title);

    if(title === 'Places'){
      this.nav.push(ListingsPage, {
          item: title
      });
    }else if(title === 'Events'){
      this.nav.push(EventsPage, {
        item: title
    });
    }else{
        this.nav.push(SubpagePage, {
            item: title
        });
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.styleDefault();
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
    });
   
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
