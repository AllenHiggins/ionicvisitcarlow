import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SearchProvider Provider');
  }
  
  getList(){
    return this.http.get("http://inframe.pythonanywhere.com/search");
  }
}
