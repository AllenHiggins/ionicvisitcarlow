import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsercommentsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UsercommentsProvider Provider');
  }


  getComments(){
    //return this.http.get();
  }

  addComment(){

  }

}
