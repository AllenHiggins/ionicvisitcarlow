import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewListingPage } from '../../pages/view-listing/view-listing';
import { MostPopularProvider } from '../../providers/most-popular/most-popular';
import { NetworkProvider } from '../../providers/network/network';
import { SearchPage } from '../search/search';

@IonicPage()
@Component({
  selector: 'page-popular',
  templateUrl: 'popular.html',
})
export class PopularPage {
  list: any;
  title: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public mostPopularProvider: MostPopularProvider,
    public networkProvider: NetworkProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopularPage');
  }

  ionViewWillEnter() {
    this.mostPopularProvider.getMostPopular().subscribe(response =>{
      this.list = response;
      console.log("popular: ",this.list);
    });
  }

  itemTapped(event, item) {
    console.log(item.id);
    this.navCtrl.push(ViewListingPage, {
        id: item.id
    });
  }

  goToSearchPage(){
    this.navCtrl.push(SearchPage);
  }

}
