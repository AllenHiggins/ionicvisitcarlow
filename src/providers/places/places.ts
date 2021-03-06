import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PlacesProvider {

  constructor(public http: HttpClient) {
    
  }

  getListings(title){
    return this.http.get('http://inframe.pythonanywhere.com/listings/cards/carlow/'+title);
  }

}
