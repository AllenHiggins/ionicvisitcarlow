import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { FabsPage } from '../../pages/fabs/fabs';
import { PopularPage } from '../../pages/popular/popular';

@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})
export class FooterComponent {

  constructor(    
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  goToPage(page){
    switch(page){
      case 'home':
        this.navCtrl.popToRoot();
      break;
      case 'fabs':
        this.navCtrl.push(FabsPage);
      break;
      case 'popular':
        this.navCtrl.push(PopularPage);
      break;
    }
  }

}
