import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SubpagePage } from '../pages/subpage/subpage';
import { ListingsPage } from '../pages/listings/listings';
import { EventsPage } from '../pages/events/events';
import { ViewListingPage } from '../pages/view-listing/view-listing';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SubpagePage,
    ListingsPage,
    EventsPage,
    ViewListingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ParallaxModule,
    ElasticHeaderModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SubpagePage,
    ListingsPage,
    EventsPage,
    ViewListingPage
  ],
  providers: [
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
    FabsProvider
  ]
})
export class AppModule {}
