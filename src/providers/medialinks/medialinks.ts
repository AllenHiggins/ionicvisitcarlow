import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MedialinksProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MedialinksProvider Provider');
  }

  getMediaLinks(id){
    return this.http.get("http://inframe.pythonanywhere.com/listings/media/"+id);
  }

}
