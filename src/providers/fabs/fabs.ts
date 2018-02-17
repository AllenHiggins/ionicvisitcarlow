import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class FabsProvider {
  private list: any;

  constructor(
    public http: HttpClient, 
    public Storage: Storage
  ) {
  }

  addToFabsList(place){
    console.log("add: ",place);
    this.list.push(place);
    this.Storage.set('fabsList', this.list);
    console.log("Fabs list: ",this.list);
  }

  removeFromList(id){
    console.log("remove: ",id);
    this.list.splice(0,1);
    this.Storage.set('fabsList', this.list);
    console.log("Fabs list: ",this.list);
  }

  // need id ?
  getFabsList(){
    return this.Storage.get('fabsList')
    .then((list) =>{
      this.list = list == null ? [] : list;
      return this.list.slice();
    });
  }

  isInList(id){
    //find id in list
    return true;
  }

}
