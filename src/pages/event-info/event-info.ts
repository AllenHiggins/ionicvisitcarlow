import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FabsProvider } from '../../providers/fabs/fabs';
import { GpsDistanceProvider } from '../../providers/gps-distance/gps-distance';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';
import { NetworkProvider } from '../../providers/network/network';
import { MapPage } from '../map/map';
import { SearchPage } from '../search/search';
import { EventsProvider } from '../../providers/events/events';

@IonicPage()
@Component({
  selector: 'page-event-info',
  templateUrl: 'event-info.html',
})

export class EventInfoPage {
  carList: any = [];
  bicyclingList: any = [];
  walkingList: any = [];
  list: any = [];
  fabs: boolean = false;
  listing: any;
  imagePath: string;
  id: any;
  title: string;
  lat: string;
  long: string;
  text: any;
  myLat: any;
  myLong: any;
  noGPS: boolean = false;
  date: string;
  eventDate: any;
  btnTitle: string;
  eventPage: string;
  start: any;
  end: any;
  time: any;
  venue: string;
  startTime: any;
  endTime: any;

 // email: string;
 // address: string;
 // phone: string;
 // phoneNumberLink: string = 'tel:';
 // emailLink: string = 'mailto:';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public InAppBrowser: InAppBrowser,
    public FabsProvider: FabsProvider,
    public gpsDistanceProvider: GpsDistanceProvider,
    public geolocation: Geolocation,
    public http: HttpClient,
    public networkProvider: NetworkProvider,
    public eventsProvider:EventsProvider
  ) {
  }


  ionViewWillEnter(){  
    this.loadData();
  }

  loadData(){
    this.fabs = false;  
    this.id = this.navParams.get('id');

    this.eventsProvider.getEvent(this.id).subscribe(response =>{
      this.listing = response;
      console.log(this.listing);

      this.title = this.listing.result[0].title;
      this.imagePath = this.listing.result[0].image;
      this.lat = this.listing.result[0].latitude;
      this.long = this.listing.result[0].longitude;
      this.text = this.listing.result[0].text;
      this.date =  this.listing.result[0].date;
      this.eventDate = new Date(this.date);
      this.btnTitle = this.listing.result[0].btnTitle;
      this.eventPage = this.listing.result[0].eventPage;
      this.start = this.listing.result[0].start;
      this.end = this.listing.result[0].end;


      this.setTime(this.start,this.end);


      this.venue = this.listing.result[0].location;
    //  this.address = this.listing.Listing[0].address;
    //  this.phone = this.listing.result[0].phone;
    //  this.phoneNumberLink = this.phoneNumberLink+this.phone;
    //  this.email = this.listing.result[0].email;
    //  this.emailLink = this.emailLink+this.email;

      this.geolocation.getCurrentPosition().then((resp) => {
        this.getDistance(resp.coords.latitude,resp.coords.longitude);
        this.noGPS = false;
      }).catch((error) => {
        this.noGPS = true;
        console.log('Error getting location', error);
      });
    });

    this.FabsProvider.getFabsList()
    .then((list) => {
      this.list = list;
      console.log("FABSLIST:", this.list);
      for(var i = 0; i < this.list.length ; i++){
        if(this.list[i].id == this.navParams.get('id')){  
          console.log("fab FOUND!");
          this.fabs = true;
          break;
        }else{
          this.fabs = false;
        }
      }
    });
  }

  setTime(start,end){
    this.startTime  = new Date();
    this.startTime.setTime(start,end);

    this.endTime  = new Date();
    this.endTime.setTime();
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

  openWebBrowser(){
    let url = this.eventPage;
    this.InAppBrowser.create(url,'_system');
  }

  addToFabs(){
      this.fabs = !this.fabs;
      const info = {
        "id": this.id,
        "title": this.title,
        "imagePath": this.imagePath,
        "page":"event"
      }
      if(this.fabs){
         this.FabsProvider.addToFabsList(info);
      }else{
        this.FabsProvider.removeFromList(this.id);
        console.log('removeing: ' , this.id);
      }
  }

  openModal(event){
    const mapData = {
      lat: this.lat,
      long: this.long,
      address: this.venue
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

