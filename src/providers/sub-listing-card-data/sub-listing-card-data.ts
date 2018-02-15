import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SubListingCardDataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SubListingCardDataProvider Provider');
  }

  getSubListingCardData(title){
    return this.http.get('http://inframe.pythonanywhere.com/category/subList/'+title);
  }

}
