import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FabsProvider } from '../../providers/fabs/fabs';
import { ViewListingPage } from '../../pages/view-listing/view-listing';
import { NetworkProvider } from '../../providers/network/network';
import { SearchPage } from '../search/search';

@IonicPage()
@Component({
  selector: 'page-fabs',
  templateUrl: 'fabs.html',
})
export class FabsPage {
  list:any = [];
  isEmpty: boolean = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fabsProvider: FabsProvider,
    public networkProvider: NetworkProvider
  ) {
  }

  ionViewCanEnter() {
    this.loadData();
  }

  ionViewWillEnter(){
    this.fabsProvider.getFabsList()
    .then((list) => {
      this.list = list;
      if(this.list.length > 0){
        this.isEmpty = false;
      }
      console.log("f: ", this.list,"isEmpty: ", this.isEmpty);
    });
  }

  loadData(){
    this.fabsProvider.getFabsList()
    .then((list) => {
      this.list = list;
      if(this.list.length > 0){
        this.isEmpty = false;
      }else{
        this.isEmpty = true;
      }
    });
  }

  itemTapped(event, item) {
    console.log("item---> ",item.title);
    this.navCtrl.push(ViewListingPage, {
        id: item.id
    });
  }

  goToSearchPage(){
    this.navCtrl.push(SearchPage);
  }

  doRefresh(refresher) {
    this.loadData();
    refresher.complete();
  }
}
