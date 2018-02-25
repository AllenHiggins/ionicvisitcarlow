import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkProvider } from '../../providers/network/network';
import { SearchProvider } from '../../providers/search/search';

import { ViewListingPage } from '../../pages/view-listing/view-listing';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  list:any = [];
  searchList = [];
  isEmpty: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public networkProvider: NetworkProvider,
    public searchProvider: SearchProvider
  ) {
  }

  ionViewDidLoad() {
    
  }

  ionViewWillEnter(){
    this.loadData();
  }

  loadData(){
    this.searchProvider.getList().subscribe(
      (response) => {
        this.list = response; 
        this.isEmpty = false;
      },(err) => {
        this.isEmpty = true;
        console.log("error");
    });
  }

  filterData(event){
    let searchValue = event.target.value;
    if(searchValue && searchValue.trim() != ''){
      this.searchList = this.list.data.filter((item) => {
        this.isEmpty = false;
        return (item.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
      });
    }else{
      this.isEmpty = true;
      return this.searchList = [];
    }
  }

  itemTapped(event, item) {
    console.log("item---> ",item.title);
    this.navCtrl.push(ViewListingPage, {
        id: item.id
    });
  }

  doRefresh(refresher) {
    this.loadData();
    refresher.complete();
  }

}
