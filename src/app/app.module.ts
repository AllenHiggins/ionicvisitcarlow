import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SubpagePage } from '../pages/subpage/subpage';
import { ListingsPage } from '../pages/listings/listings';
import { EventsPage } from '../pages/events/events';
import { ViewListingPage } from '../pages/view-listing/view-listing';
import { FabsPage } from '../pages/fabs/fabs';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { GoogleMaps } from '@ionic-native/google-maps';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriesProvider } from '../providers/categories/categories';
import { SubCategoriesProvider } from '../providers/sub-categories/sub-categories';
import { PlacesProvider } from '../providers/places/places';
import { EventsProvider } from '../providers/events/events';
import { ListingProvider } from '../providers/listing/listing';
import { SubListingCardDataProvider } from '../providers/sub-listing-card-data/sub-listing-card-data';
import { ParallaxModule } from 'ionic-parallax';
import { ElasticHeaderModule } from "ionic2-elastic-header/dist";
import { MedialinksProvider } from '../providers/medialinks/medialinks';
import { FabsProvider } from '../providers/fabs/fabs';
import { Geolocation } from '@ionic-native/geolocation';
import { GpsDistanceProvider } from '../providers/gps-distance/gps-distance';
import { LikesProvider } from '../providers/likes/likes';

import { ComponentsModule } from '../components/components.module';
import { MapPage } from '../pages/map/map';
import { PopularPage } from '../pages/popular/popular';
import { MostPopularProvider } from '../providers/most-popular/most-popular';
import { HeaderColor } from '@ionic-native/header-color';
import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../providers/network/network';
import { SearchProvider } from '../providers/search/search';
import { SearchPage } from '../pages/search/search';
import { EventInfoPage } from '../pages/event-info/event-info';
import { ContactsPage } from '../pages/contacts/contacts';
import { ContactsProvider } from '../providers/contacts/contacts';
import { OnboardingPage } from '../pages/onboarding/onboarding';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { FIREBASE_CONFIG } from '../angular.firebase'

//import firebase from 'firebase';
import { UsercommentsProvider } from '../providers/usercomments/usercomments';
import { AuthProvider } from '../providers/auth/auth';
import { FormsModule } from '@angular/forms'; 
import { GooglePlus } from '@ionic-native/google-plus';


//import {CommentsPage} from '../pages/comments/comments';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SubpagePage,
    ListingsPage,
    EventsPage,
    ViewListingPage,
    FabsPage,
    MapPage,
    PopularPage,
    SearchPage,
    EventInfoPage,
    ContactsPage,
    OnboardingPage,
 //   CommentsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    ParallaxModule,
    ElasticHeaderModule,
    ComponentsModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SubpagePage,
    ListingsPage,
    EventsPage,
    ViewListingPage,
    FabsPage,
    MapPage,
    PopularPage,
    SearchPage,
    EventInfoPage,
    ContactsPage,
    OnboardingPage,
   // CommentsPage

  ],
  providers: [
    Network,
    HeaderColor,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriesProvider,
    SubCategoriesProvider,
    PlacesProvider,
    EventsProvider,
    ListingProvider,
    SubListingCardDataProvider,
    MedialinksProvider,
    InAppBrowser,
    FabsProvider,
    LaunchNavigator,
    GoogleMaps,
    Geolocation,
    GpsDistanceProvider,
    LikesProvider,
    MostPopularProvider,
    NetworkProvider,
    SearchProvider,
    ContactsProvider,
    UsercommentsProvider,
    AuthProvider,
    GooglePlus

  ]
})
export class AppModule {}
