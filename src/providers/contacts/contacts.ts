import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ContactsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ContactsProvider Provider');
  }


  getCardData(listTypeID){
    return this.http.get("http://inframe.pythonanywhere.com/contacts/" + listTypeID);
  }


}
