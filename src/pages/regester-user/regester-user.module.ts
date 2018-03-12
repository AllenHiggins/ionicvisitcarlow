import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegesterUserPage } from './regester-user';

@NgModule({
  declarations: [
    RegesterUserPage,
  ],
  imports: [
    IonicPageModule.forChild(RegesterUserPage),
  ],
})
export class RegesterUserPageModule {}
