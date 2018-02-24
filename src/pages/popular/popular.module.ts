import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopularPage } from './popular';

@NgModule({
  declarations: [
    PopularPage,
  ],
  imports: [
    IonicPageModule.forChild(PopularPage),
  ],
})
export class PopularPageModule {}
