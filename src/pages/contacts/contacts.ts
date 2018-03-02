import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkProvider } from '../../providers/network/network';
import { SearchPage } from '../search/search';
import { GpsDistanceProvider } from '../../providers/gps-distance/gps-distance';
import { Geolocation } from '@ionic-native/geolocation';
import { MapPage } from '../map/map';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpClient } from '@angular/common/http';

import { ListingProvider } from '../../providers/listing/listing';
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
  imagePath: string;
  id: any;
  title: string;
  email: string;
  phone: string;
  text: any;
  phoneNumberLink: string = 'tel:';
  emailLink: string = 'mailto:';
  myLat: any;
  myLong: any;
  badRequest: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public networkProvider: NetworkProvider,
    public InAppBrowser: InAppBrowser,
    public gpsDistanceProvider: GpsDistanceProvider,
    public geolocation: Geolocation,
    public http: HttpClient,
    public ListingProvider: ListingProvider,
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
    this.title = this.navParams.get('item');

////////////////////////////////////////////////////////////////////////
    // chioce is undefined - use contacts provider pass in title
    // create API end point

    this.ListingProvider.getListings(this.id).subscribe(response =>{
      this.list = response;
      console.log(this.list);
      this.title = this.list.Listing[0].name;
      this.imagePath = this.list.Listing[0].image;
      //this.address = this.list.Listing[0].address;
      this.lat = this.list.Listing[0].latitude;
      this.long = this.list.Listing[0].longitude;
      this.phone = this.list.Listing[0].phone;
      this.phoneNumberLink = this.phoneNumberLink+this.phone;
      this.email = this.list.Listing[0].email;
      this.emailLink = this.emailLink+this.email;
      this.text = this.list.Listing[0].text;
      this.badRequest = this.list.Listing[0].error;
////////////////////////////////////////////////////////////////////////////////////

      this.geolocation.getCurrentPosition().then((resp) => {
        this.getDistance(resp.coords.latitude,resp.coords.longitude);
        this.noGPS = false;
      }).catch((error) => {
        this.noGPS = true;
        console.log('Error getting location', error);
      });
    });

  }

  getDistance(lat,long){
    var car = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="
    +lat+","
    +long+"&destinations="+this.long+","
    +this.lat+"&mode=driving&key=AIzaSyChoxvY816Q0WjlL22RlDrGJ9n-fo4Nh-A";

    var bicycling = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="
    +lat+","
    +long+"&destinations="+this.long+","
    +this.lat+"&mode=bicycling&key=AIzaSyChoxvY816Q0WjlL22RlDrGJ9n-fo4Nh-A";

    var walking = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="
    +lat+","
    +long+"&destinations="+this.long+","
    +this.lat+"&mode=walking&key=AIzaSyChoxvY816Q0WjlL22RlDrGJ9n-fo4Nh-A";
    
    console.log(this.lat, " ==== ", this.long);

    if(this.lat != null && this.long != null){
      this.http.get(car).subscribe((data => {
        this.carList = {
          "distance": data["rows"][0].elements[0].distance.text,
          "car": data["rows"][0].elements[0].duration.text
        }
        this.http.get(bicycling).subscribe((data => {
          this.bicyclingList = {
            "bicycling": data["rows"][0].elements[0].duration.text
          }
          this.http.get(walking).subscribe((data => {
            this.walkingList = {
              "walking": data["rows"][0].elements[0].duration.text
            }
          }),(err) => {
            console.log(err);
          });
        }),(err) => {
          console.log(err);
        });
      }),(err) => {
        console.log(err);
      });
    }else{
      console.log("empty..");
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
