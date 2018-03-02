import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkProvider } from '../../providers/network/network';
import { SearchPage } from '../search/search';
import { GpsDistanceProvider } from '../../providers/gps-distance/gps-distance';
import { Geolocation } from '@ionic-native/geolocation';
import { MapPage } from '../map/map';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpClient } from '@angular/common/http';
import { ContactsProvider } from '../../providers/contacts/contacts';

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  long: string;
  lat: string;
  noGPS: boolean = false;
  carList: any = [];
  bicyclingList: any = [];
  walkingList: any = [];
  list: any = [];
  id: any;
  title: string;
  phone: string;
  phoneNumberLink: string = 'tel:';
// emailLink: string = 'mailto:';
// email: string;
  badRequest: string;
  avatar: string;
  type: string;
  passedItem: any;
  name: string;
  address: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public networkProvider: NetworkProvider,
    public InAppBrowser: InAppBrowser,
    public gpsDistanceProvider: GpsDistanceProvider,
    public geolocation: Geolocation,
    public http: HttpClient,
    public contactsProvider: ContactsProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData(){
    let id = this.navParams.get('id');
    console.log(id);
    //this.passedItem = this.navParams.get('item');
    //this.title = this.passedItem.title;
    this.contactsProvider.getCardData(id).subscribe(response =>{
      this.list = response;
      console.log(this.list);
      this.setAvatar(id);
    });
  }

  setAvatar(title){
    console.log(title);
    switch(title){
      case 43:
        this.avatar = 'assets/imgs/policeAv.png';
      break;
      case 44:
        this.avatar = 'assets/imgs/bankingAv.png';
      break;
      case 38:
        this.avatar = 'assets/imgs/outOfHoursAv.png';
      break;
      case 40:
        this.avatar = 'assets/imgs/hospitalAv.png'; 
      break;
      case 42:
        this.avatar = 'assets/imgs/dentalAv.png';
      break;  
      case 45:
        this.avatar = 'assets/imgs/postOfficeAv.png'; 
      break;
      case 39:
        this.avatar = 'assets/imgs/GPAv.png'; 
      break;
      default:
        this.avatar = 'assets/imgs/defaultAv.png';
    }
  }

  openModal(lat,long,address){
    const mapData = {
      lat:lat,
      long:long,
      address:address
    }
    this.navCtrl.push(MapPage, {
      data: mapData
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
