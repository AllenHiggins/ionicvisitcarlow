import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListingsPage } from './listings';

@NgModule({
  declarations: [
    ListingsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListingsPage),
  ],
})
export class ListingsPageModule {}
