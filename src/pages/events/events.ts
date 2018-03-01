import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkProvider } from '../../providers/network/network';
import { SearchPage } from '../search/search';
import { EventsProvider } from '../../providers/events/events';
import { EventInfoPage } from '../event-info/event-info';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  list: any;
  title: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public networkProvider: NetworkProvider,
    public eventsProvider: EventsProvider
  ) {
  }

  ionViewDidLoad() {
    this.title = this.navParams.get('item');
  }

  ionViewWillEnter(){
    this.loadData();
  }

  goToSearchPage(){
    this.navCtrl.push(SearchPage);
  }

  loadData(){
    this.eventsProvider.getCardEvents().subscribe(response =>{
      this.list = response;
      console.log("events: ",this.list);
    });
  }

  itemTapped(event, item) {
    console.log(item.id);
    this.navCtrl.push(EventInfoPage, {
        id: item.id
    });
  }

  doRefresh(refresher) {
    this.loadData();
    refresher.complete();
  }

}
