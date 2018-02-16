import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

declare var google: any;
@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  @ViewChild('map') mapRef: ElementRef;
  lat : any;
  long: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ViewController: ViewController
  ) {

  }

  ionViewDidLoad() {
    this.initMap();
  }

  ionViewWillLoad(){
    const data = this.navParams.get("data");
    this.lat = data.lat;
    this.long = data.long;

    console.log(data, this.lat, this.long);
  }

  closeModal(){
    this.ViewController.dismiss();
  }

  initMap(){
    const location = new google.maps.LatLng(this.long,this.lat);

    const options ={
      center: location,
      zoom: 14,
    }

    const map = new google.maps.Map(this.mapRef.nativeElement,options);
    this.addMarker(location,map);
  }

  addMarker(position,map){
    return new google.maps.Marker({
      position,
      map
    });
  }
}
