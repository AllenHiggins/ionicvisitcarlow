import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, Platform } from 'ionic-angular';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
 //declare var google: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapRef: ElementRef;
  map: GoogleMap;
  lat : any;
  long: any;
  address: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ViewController: ViewController,
    private launchNavigator: LaunchNavigator,
    private googleMaps: GoogleMaps,
    private platform: Platform
  ) {
   // platform.ready().then(() => {
///this.loadMap();
   // });
  }

  ionViewDidLoad() {
   
  }

  ionViewWillLoad(){
    const data = this.navParams.get("data");
    this.lat = data.lat;
    this.long = data.long;
    this.address = data.address;
    this.loadMap();
    console.log(data, this.lat, this.long);
  }

  closeModal(){
    this.ViewController.dismiss();
  }

  loadMap() {
    
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng:  -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create(this.mapRef.nativeElement, mapOptions);

    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat:  43.0741904,
              lng:  -89.3809802
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                console.log('clicked');
              });
          });

      });
  }

  navme(){
    this.launchNavigator.navigate(this.address)
    .then(
      success =>{
        console.log('Launched navigator');
      },
      error => {
        console.log('Error launching navigator', error);
      });
  }

}
