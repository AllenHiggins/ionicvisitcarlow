import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ListingProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ListingProvider Provider');
  }

  getListings(id){
    return this.http.get('http://inframe.pythonanywhere.com/listing/choice/'+id);
  }

}
