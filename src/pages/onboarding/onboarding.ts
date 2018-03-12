import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides, MenuController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {

  @ViewChild(Slides) slides: Slides;
  skip: boolean = false;
  skipBtn: string = "Skip";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuController: MenuController
  ) {

  }

  ionViewDidLoad() {
    this.menuController.swipeEnable(false);
    console.log('ionViewDidLoad OnboardingPage');
  }

  skipInfo(){
    this.skip = true;
    this.navCtrl.popToRoot();
  }

  slideChanged(){
    if(this.slides.isEnd()){
      this.skipBtn = "Continue";
    }
  }

}
