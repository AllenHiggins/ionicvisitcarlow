import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkProvider } from '../../providers/network/network';
import { SearchPage } from '../search/search';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  title: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public networkProvider: NetworkProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
    this.title = this.navParams.get('item');
  }

  goToSearchPage(){
    this.navCtrl.push(SearchPage);
  }

  doRefresh(refresher) {
    //this.loadData();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
