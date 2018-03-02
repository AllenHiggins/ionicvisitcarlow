import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListingsPage } from '../listings/listings';
import { SubCategoriesProvider } from '../../providers/sub-categories/sub-categories';
import { NetworkProvider } from '../../providers/network/network';
import { SearchPage } from '../search/search';

import { ContactsPage } from '../contacts/contacts';

@Component({
  selector: 'page-subpage',
  templateUrl: 'subpage.html',
})
export class SubpagePage {
  list: any;
  title: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public SubCategoriesProvider: SubCategoriesProvider,
    public networkProvider: NetworkProvider) {
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData(){
    this.title = this.navParams.get('item');
    console.log('ionViewDidLoad SubpagePage:',this.title);

    this.SubCategoriesProvider.getSubCategories(this.title).subscribe(response => {
      this.list = response;
      console.log(this.list);
    });
  }

  itemTapped(event, item) {

    console.log(item.title);
    let title = item.title;

    if(
      title === 'Out-of-hours GP' 
      || title === 'GP'
      || title === 'Hospital'
      || title === 'Dental'
      || title === 'Gardai (Police)'
      || title === 'Banking'
      || title === 'Post Office'
    ){
      this.navCtrl.push(ContactsPage, {
          item: title
      });
    }else{
      this.navCtrl.push(ListingsPage, {
          item: item.title
      });
    }
  }

  goToSearchPage(){
    this.navCtrl.push(SearchPage);
  }

  doRefresh(refresher) {
    this.loadData();
    refresher.complete();
  }

}
