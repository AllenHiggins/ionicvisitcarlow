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
  Marker,
  LatLng,
 } from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  //@ViewChild('map') mapRef: ElementRef;
  map: GoogleMap;
  mapElement: HTMLElement;
  lat : any;
  long: any;
  address: string;
  private location:LatLng;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ViewController: ViewController,
    private launchNavigator: LaunchNavigator,
    private googleMaps: GoogleMaps,
    private platform: Platform
  ) {
  
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  ionViewWillLoad(){
    const data = this.navParams.get("data");
    this.lat = data.lat;
    this.long = data.long;
    this.address = data.address;
    this.platform.ready().then(() => {
      this.loadMap();
    });
    console.log(this.address, this.lat, this.long);
  }

  closeModal(){
    this.ViewController.dismiss();
  }

  loadMap(){
    try{
      //alert("lat="+this.lat +" long="+ this.long);
      let mapOption: GoogleMapOptions = {
        camera: {
          target: {
            lat:this.long,
            lng:this.lat
            //lat: 43.0741904,
            //lng: -89.3809802
          },
          zoom: 15,
          tilt: 30
        }
      };

      this.map = this.googleMaps.create('map_canvas', mapOption);

      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {
          this.map.addMarker({
              title: this.address+" ,Ireland",
              icon: '#69177a',
              animation: 'DROP',
              position: {
                lat:this.long,
                lng:this.lat
               // lat: 43.0741904,
               // lng: -89.3809802
              }
            })
            .then(marker => {
              marker.on(GoogleMapsEvent.MARKER_CLICK)
                .subscribe(() => {
                  console.log('clicked');
                });
            }).catch((err) =>{
              alert("error3: "+ err);
            });

        }).catch((err)=> {
          alert("catch1: "+ err);
        });
      
    }catch(err){
      alert("Catch2: "+err);
    }

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
