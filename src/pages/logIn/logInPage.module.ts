import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { logInPage } from './logInPage';

@NgModule({
  declarations: [
    logInPage,
  ],
  imports: [
    IonicPageModule.forChild(logInPage),
  ],
})
export class logInPageModule {}
