import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ListingProvider } from '../../providers/listing/listing';
import { MedialinksProvider } from '../../providers/medialinks/medialinks';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FabsProvider } from '../../providers/fabs/fabs';
import { GpsDistanceProvider } from '../../providers/gps-distance/gps-distance';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';
import { LikesProvider } from '../../providers/likes/likes';

import { MapPage } from '../map/map';

@IonicPage()
@Component({
  selector: 'page-view-listing',
  templateUrl: 'view-listing.html',
})
export class ViewListingPage {
  carList: any = [];
  bicyclingList: any = [];
  walkingList: any = [];
  list: any = [];
  fabs: boolean = false;
  media: any;
  listing: any;
  imagePath: string;
  id: any;
  title: string;
  email: string;
  address: string;
  lat: string;
  long: string;
  phone: string;
  text: any;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  myLat: any;
  myLong: any;
  noGPS: boolean = false;
  like: boolean;
  likesRep: any;
  numberOfLikes: any;
  phoneNumberLink: string = 'tel:';
  emailLink: string = 'mailto:';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ListingProvider: ListingProvider,
    public MedialinksProvider: MedialinksProvider,
    public InAppBrowser: InAppBrowser,
    public ModalController: ModalController,
    public FabsProvider: FabsProvider,
    public gpsDistanceProvider: GpsDistanceProvider,
    public geolocation: Geolocation,
    public http: HttpClient,
    public likesProvider: LikesProvider
  ) {
  }


  ionViewWillEnter(){  
    this.fabs = false;  
    this.id = this.navParams.get('id');
    this.ListingProvider.getListings(this.id).subscribe(response =>{
      this.listing = response;
      console.log(this.listing);
      this.numberOfLikes = this.listing.Listing[0].likes;
      this.title = this.listing.Listing[0].name;
      this.imagePath = this.listing.Listing[0].image;
      this.address = this.listing.Listing[0].address;
      this.lat = this.listing.Listing[0].latitude;
      this.long = this.listing.Listing[0].longitude;
      this.phone = this.listing.Listing[0].phone;
      this.phoneNumberLink = this.phoneNumberLink+this.phone;
      this.email = this.listing.Listing[0].email;
      this.emailLink = this.emailLink+this.email;
      this.text = this.listing.Listing[0].text;
      this.geolocation.getCurrentPosition().then((resp) => {
        this.getDistance(resp.coords.latitude,resp.coords.longitude);
        this.noGPS = false;
      }).catch((error) => {
        this.noGPS = true;
        console.log('Error getting location', error);
      });
    });

    this.MedialinksProvider.getMediaLinks(this.id).subscribe(respone =>{
      this.media = respone;
      this.website = this.media.Media[0].website;
      this.facebook = this.media.Media[0].facebook;
      this.twitter = this.media.Media[0].twitter;
      this.instagram = this.media.Media[0].instagram;
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

    this.likesProvider.getLikeList()
    .then((list) => {
      this.list = list;
      console.log("likeLIST:", this.list);
      for(var i = 0; i < this.list.length ; i++){
        if(this.list[i].id == this.navParams.get('id')){  
          console.log("Like FOUND!");
          this.like = true;
          break;
        }else{
          this.like = false;
          console.log("Like NOT FOUND!");
        }
      }
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

  openWebBrowser(link){
    let url = '';
    switch(link){
      case 'website':
        url = this.website;
      break;
      case 'faceBook':
        url = this.facebook;
      break;
      case 'twitter':
        url = this.twitter
      break;
      case 'instagram':
        url = this.instagram;
      break;
    }
    const browser = this.InAppBrowser.create(url,'_system');
  }

  addToFabs(){
      this.fabs = !this.fabs;
      const info = {
        "id": this.id,
        "title": this.title,
        "imagePath": this.imagePath
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
      address: this.address
    }
    this.navCtrl.push(MapPage, {
    //  item: 'Map'
      data: mapData
    });
    /*const mapData = {
      lat: this.lat,
      long: this.long,
      address: this.address
    }
    const modal = this.ModalController.create("MapPage",{data: mapData} );
    modal.present();
    */
  }

  likeListing(){
    this.like = !this.like;
    const info = {
        "id": this.id,
        "title": this.title,
        "imagePath": this.imagePath
      }
    if(this.like){
      this.likesProvider.addToLikes(info).subscribe(response =>{
       console.log("added: ",response);
       this.likesRep = response;
       this.numberOfLikes = this.likesRep.listingLikes[0].likes;
      });
    }else{
      this.likesProvider.unLike(this.id).subscribe(response =>{
        console.log("remove: ",response);
        this.likesRep = response;
        this.numberOfLikes = this.likesRep.listingLikes[0].likes;
      });
    }
    
  }

}
