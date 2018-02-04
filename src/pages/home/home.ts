import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoriesProvider } from '../../providers/categories/categories';
import { SubpagePage } from '../subpage/subpage';
import { ListingsPage } from '../listings/listings';
import { EventsPage } from '../events/events';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  list:any;
  sublist: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public CategoriesProvider: CategoriesProvider){

  }

  ionViewWillEnter(){
    this.CategoriesProvider.getCategories().subscribe(response =>{
      this.list = response;
    });
  }

  itemTapped(event, item) {

    let title = item.title;

    if(title === 'Places'){
      this.navCtrl.push(ListingsPage, {
          item: title
      });
    }else if(title === 'Events'){
      this.navCtrl.push(EventsPage, {
        item: title
    });
    }else{
        this.navCtrl.push(SubpagePage, {
            item: title
        });
    }
  
  }

}
