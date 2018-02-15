import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ListingProvider } from '../../providers/listing/listing';
import { MedialinksProvider } from '../../providers/medialinks/medialinks';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-view-listing',
  templateUrl: 'view-listing.html',
})
export class ViewListingPage {
  like: boolean;
  media: any;
  listing: any;
  imagePath: string;
  id: any;
  title: string;
  address: string;
  lat: string;
  long: string;
  phone: string;
  text: any;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ListingProvider: ListingProvider,
    public MedialinksProvider: MedialinksProvider,
    public InAppBrowser: InAppBrowser,
    public ModalController: ModalController
  ) {
    this.like = false;
  }

  ionViewWillEnter(){
    this.id = this.navParams.get('id');
    this.ListingProvider.getListings(this.id).subscribe(response =>{
      this.listing = response;
      this.title = this.listing.Listing[0].name;
      this.imagePath = this.listing.Listing[0].image;
      this.address = this.listing.Listing[0].address;
      this.lat = this.listing.Listing[0].latitude;
      this.long = this.listing.Listing[0].longitude;
      this.phone = this.listing.Listing[0].phone;
      this.text = this.listing.Listing[0].text;
      console.log(this.listing);
    });

    this.MedialinksProvider.getMediaLinks(this.id).subscribe(respone =>{
      this.media = respone;
      this.website = this.media.Media[0].website;
      this.facebook = this.media.Media[0].facebook;
      this.twitter = this.media.Media[0].twitter;
      this.instagram = this.media.Media[0].instagram;
      console.log("website: ",this.website);
    });
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
      this.like = !this.like;
      console.log(this.like);
  }

  openModal(){
    const mapData = {
      lat: this.lat,
      long: this.long
    }
    const modal = this.ModalController.create("ModalPage",{data: mapData} );
    modal.present();
  }
/////////////////////////////////////////////////////////
////////////       FROM API    /////////////////////////
///////       NEED ALL MEDIA LINKS   //////////////////     
/////////////////////////////////////////////////////
////////////////////////////////////////////////////


}
