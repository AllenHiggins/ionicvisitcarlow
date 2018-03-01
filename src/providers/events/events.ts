import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class EventsProvider {


  constructor(public http: HttpClient) {
  }

  getCardEvents(){
    return this.http.get("http://inframe.pythonanywhere.com/events");
  }

  getEvent(id){
    return this.http.get("http://inframe.pythonanywhere.com/events/get/"+id);
  }

}
