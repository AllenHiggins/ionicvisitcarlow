import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class FabsProvider {
  private list: any;
  private isIN: boolean;

  constructor(
    public http: HttpClient, 
    public Storage: Storage
  ) {
  }

  addToFabsList(place){
    this.list.push(place);
    this.Storage.set('fabsList', this.list);
  }

  removeFromList(listId){
    for(var i = 0; i < this.list.length ; i++){
      if(this.list[i].id == listId){
         this.list.splice(0,1);    
      }
    }
    this.Storage.set('fabsList', this.list);
  }

  getFabsList(){
    return this.Storage.get('fabsList')
    .then((list) =>{
      this.list = list == null ? [] : list;
      return this.list.slice();
    });
  }

}
