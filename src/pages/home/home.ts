import { Component } from '@angular/core';
import { NavController, NavParams,MenuController, LoadingController } from 'ionic-angular';
import { CategoriesProvider } from '../../providers/categories/categories';
import { SubpagePage } from '../subpage/subpage';
import { ListingsPage } from '../listings/listings';
import { EventsPage } from '../events/events';
import { SearchPage } from '../search/search';
import { NetworkProvider } from '../../providers/network/network';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  list:any = [];
  sublist: any;
  empty: boolean = true;
  offLine: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public CategoriesProvider: CategoriesProvider,
    public networkProvider: NetworkProvider,
    public menuController: MenuController,
    public loadingCtrl: LoadingController
  ){
    this.offLine = this.networkProvider.con;
  }


  ionViewDidEnter(){
  
    /*if(){
        this.offLine = false; 
    }else{
        this.offLine = true;
    }*/

    if(this.list ){
      this.empty = true;
    }else{
      this.empty = false;
    }
    this.loadData();
  }

  ionViewWillEnter(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present().then(() =>{
      this.menuController.swipeEnable(true);
      this.CategoriesProvider.getCategories().subscribe(
        (response) => {
          this.list = response; 
          this.empty = false;
          loading.dismiss();
        },(err) => {
          this.empty = true;
          console.log("error");
      }); 
    });
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

  goToSearchPage(){
    this.navCtrl.push(SearchPage);
  }

  itemTapped(event, item) {

    let title = item.title;
    console.log(title);
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

  doRefresh(refresher) {
    this.loadData();
    refresher.complete();
  }

}
