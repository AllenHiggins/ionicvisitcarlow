import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FabsProvider } from '../../providers/fabs/fabs';
import { ViewListingPage } from '../../pages/view-listing/view-listing';

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
    public fabsProvider: FabsProvider
  ) {
  }

  ionViewCanEnter() {
    console.log('ionViewDidLoad FabsPage');
    this.fabsProvider.getFabsList()
    .then((list) => {
      this.list = list;
      if(this.list.length > 0){
        this.isEmpty = false;
      }else{
        this.isEmpty = true;
      }
      console.log("f: ", this.list,"isEmpty: ", this.isEmpty);
    });
  }

  ionViewWillLoad(){
    this.fabsProvider.getFabsList()
    .then((list) => {
      this.list = list;
      if(this.list.length > 0){
        this.isEmpty = false;
      }
      console.log("f: ", this.list,"isEmpty: ", this.isEmpty);
    });
  }

  itemTapped(event, item) {
    console.log("item---> ",item.title);
    this.navCtrl.push(ViewListingPage, {
        id: item.id
    });
  }
}
