import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SubpagePage } from '../pages/subpage/subpage';
import { ListingsPage } from '../pages/listings/listings';
import { EventsPage } from '../pages/events/events';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriesProvider } from '../providers/categories/categories';
import { SubCategoriesProvider } from '../providers/sub-categories/sub-categories';
import { PlacesProvider } from '../providers/places/places';
import { EventsProvider } from '../providers/events/events';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SubpagePage,
    ListingsPage,
    EventsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SubpagePage,
    ListingsPage,
    EventsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriesProvider,
    SubCategoriesProvider,
    PlacesProvider,
    EventsProvider
  ]
})
export class AppModule {}
