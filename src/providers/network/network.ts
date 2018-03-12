import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';

@Injectable()
export class NetworkProvider {

 // connected: Subscription;
 // disconnected: Subscription;
  public con: boolean;


  constructor(
    public http: HttpClient,
    private network: Network,
    private toastController: ToastController
  ) {

    
     this.network.onDisconnect().subscribe(data => {
      console.log(data);
      this.displayNetworkUpdate(data.type);
      this.con = true;
      },error => {
      console.log(error);
    });

    this.network.onConnect().subscribe(data =>{
      console.log(data);
      this.displayNetworkUpdate(data.type);
      this.con = false;
    },error => {
      console.log(error);
    });

  }

  displayNetworkUpdate(connectionSate: string){
    this.toastController.create({
      message: 'Network ' + connectionSate,
      duration: 3000
    }).present();
  } 

}
