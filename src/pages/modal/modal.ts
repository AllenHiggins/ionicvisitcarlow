import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ViewController: ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  ionViewWillLoad(){
    const data = this.navParams.get("data");
    console.log(data);
  }

  closeModal(){
    this.ViewController.dismiss();
  }
}
