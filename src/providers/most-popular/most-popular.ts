import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MostPopularProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MostPopularProvider Provider');
  }

  getMostPopular(){
    return this.http.get('http://inframe.pythonanywhere.com/popular');
  }

}
