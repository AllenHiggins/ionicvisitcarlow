import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkProvider } from '../../providers/network/network';
import { SearchProvider } from '../../providers/search/search';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ViewListingPage } from '../../pages/view-listing/view-listing';
import { ContactsPage } from '../../pages/contacts/contacts';
import { EventsProvider } from '../../providers/events/events';
import { EventInfoPage } from '../../pages/event-info/event-info';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  list:any = [];
  eventList: any = [];
  searchList = [];
  isEmpty: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public networkProvider: NetworkProvider,
    public InAppBrowser: InAppBrowser,
    public searchProvider: SearchProvider,
    public eventsProvider: EventsProvider
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

        // added on events list
        this.eventsProvider.getCardEvents().subscribe((response)=>{
          this.eventList = response;
          let l = this.eventList.result[0];
          this.list = this.list.data.concat(l);
          console.log("BB: ",this.list);
        },(error)=>{
          console.log("error");
        });
      },(err) => {
        this.isEmpty = true;
        console.log("error");
    });
  }

  filterData(event){
    let searchValue = event.target.value;
    if(searchValue && searchValue.trim() != ''){
      this.searchList = this.list.filter((item) => {
        this.isEmpty = false;
        return (item.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
      });
    }else{
      this.isEmpty = true;
      return this.searchList = [];
    }
  }

  itemTapped(event, item) {

    console.log("item---> ",item.typeId);

    if(item.typeId === 38 
       || item.typeId === 39
       || item.typeId === 40
       || item.typeId === 42
       || item.typeId === 43
       || item.typeId === 44
       || item.typeId === 45){
      this.navCtrl.push(ContactsPage, {
        id: item.typeId
      });
    }else if(item.typeId === 170181){
      this.navCtrl.push(EventInfoPage, {
        id: item.id
      });
    }else{
      this.navCtrl.push(ViewListingPage, {
          id: item.id
      });
    }

  }

  doRefresh(refresher) {
    this.loadData();
    refresher.complete();
  }

  openLink(){
    const url = 'https://www.visitcarlow.ie/'
    this.InAppBrowser.create(url,'_system');
  }

}
