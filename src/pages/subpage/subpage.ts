import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListingsPage } from '../listings/listings';
import { SubCategoriesProvider } from '../../providers/sub-categories/sub-categories';

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
    public SubCategoriesProvider: SubCategoriesProvider) {
  }

  ionViewWillEnter() {
    this.title = this.navParams.get('item');
    console.log('ionViewDidLoad SubpagePage:',this.title);

    this.SubCategoriesProvider.getSubCategories(this.title).subscribe(response => {
      this.list = response;
      console.log(this.list);
    });
  }

  itemTapped(event, item) {
    this.navCtrl.push(ListingsPage, {
        item: item.title
    });
  }

}
