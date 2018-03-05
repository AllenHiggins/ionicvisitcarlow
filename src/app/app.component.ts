import { Component, ViewChild } from '@angular/core';
import { Nav,Platform,MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HeaderColor } from '@ionic-native/header-color';

import { HomePage } from '../pages/home/home';
import { OnboardingPage } from '../pages/onboarding/onboarding';
import { SubpagePage } from '../pages/subpage/subpage';
import { ListingsPage } from '../pages/listings/listings';
import { EventsPage } from '../pages/events/events';
import { FabsPage } from '../pages/fabs/fabs';
import { PopularPage } from '../pages/popular/popular';

import { timer } from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  list: any;
  facebook: string = "https://m.facebook.com/VisitCarlow";
  instagram: string = "https://www.instagram.com/visitcarlow";
  twitter: string = "https://mobile.twitter.com/VisitCarlow";
  website: string ="http://www.visitcarlow.ie";

  @ViewChild(Nav) nav: Nav;

  showSplash = true;
  menu:any;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public InAppBrowser: InAppBrowser,
    private headerColor: HeaderColor,
    private menuController: MenuController) {
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
      {title:'Entertainment',icon:path+"enter.png"},
      {title:'My Favourites',icon:path+"fabs.png"},
      {title:'Popular', icon:path+"checkicon.png"}
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
    }else if(title === 'My Favourites'){
      this.nav.push(FabsPage, {
        item: title
    });
    }else if(title === 'Popular'){
      this.nav.push(PopularPage, {
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
      
      // platform is ready and our plugins are available.
    
      //this.statusBar.styleDefault();
      
      // let status bar overlay webview
      this.statusBar.overlaysWebView(false);

      // set status bar to purple
      this.statusBar.backgroundColorByHexString('#280321');
      this.statusBar.styleBlackTranslucent();

      this.headerColor.tint('#280321');

      this.splashScreen.hide();
      this.nav.push(OnboardingPage);
      timer(2500).subscribe(() => {
        this.showSplash = false;
      });

    });
   
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openWebBrowser(link){
    let url = '';
    switch(link){
      case 'website':
        url = this.website;
      break;
      case 'faceBook':
        url = this.facebook;
      break;
      case 'twitter':
        url = this.twitter
      break;
      case 'instagram':
        url = this.instagram;
      break;
    }
    const browser = this.InAppBrowser.create(url,'_system');
  }
}
