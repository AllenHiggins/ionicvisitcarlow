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
  list:any = [];
  sublist: any;
  empty: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public CategoriesProvider: CategoriesProvider){

  }

  ionViewDidEnter(){
    if(this.list == ''){
      this.empty = true;
    }else{
      this.empty = false;
    }
    this.loadData();
  }

  ionViewWillEnter(){
   this.loadData();
  }

  loadData(){
    this.CategoriesProvider.getCategories().subscribe(
      (response) => {
        this.list = response; 
        this.empty = false;
      },(err) => {
        this.empty = true;
        console.log("error");
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
