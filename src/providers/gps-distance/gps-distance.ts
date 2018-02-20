import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class GpsDistanceProvider {

  constructor(
    public http: HttpClient,
    private geolocation: Geolocation) {
    console.log('Hello GpsDistanceProvider Provider');
  }

  getDistance(lat,long){
    let str = "";
    this.geolocation.getCurrentPosition().then((resp) => {
      str = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="
      +resp.coords.latitude+","
      +resp.coords.longitude+"&destinations="+lat+","
      +long+"&mode=driving&key=AIzaSyChoxvY816Q0WjlL22RlDrGJ9n-fo4Nh-A";
      console.log(str);
    }).catch((error) => {
      console.log('Error getting location', error);
    }); 
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });

    console.log(str);
    return this.http.get(str);
  }

  
}
