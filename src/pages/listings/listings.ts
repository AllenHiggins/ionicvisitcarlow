import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlacesProvider } from '../../providers/places/places';

@IonicPage()
@Component({
  selector: 'page-listings',
  templateUrl: 'listings.html',
})
export class ListingsPage {

  list: any;
  title: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public PlacesProvider: PlacesProvider) {
  }

  ionViewWillEnter() {
    this.title = this.navParams.get('item');
    console.log('ionViewDidLoad ListingsPage', this.title);

    this.PlacesProvider.getListings(this.title).subscribe(response =>{
      this.list = response;
      console.log(this.list);
    });
  }

}
