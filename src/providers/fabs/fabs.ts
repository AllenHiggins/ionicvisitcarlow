import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class FabsProvider {
  private list: any = [];

  constructor(public http: HttpClient) {
  }

  addToFabsList(place){
    console.log("add: ",place);
    this.list.push(place);
    console.log("Fabs list: ",this.list);
  }

  removeFromList(place){
    console.log("remove: ",place);
  }

  getFabsList(){

  }

  isInList(place){
    return true;
  }

}
