import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LikesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello LikesProvider Provider');
  }

  addToLikes(){

  }

  unLike(){
    
  }

}
