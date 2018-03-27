import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsercommentsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UsercommentsProvider Provider');
  }


  getComments(id){
    return this.http.get("http://inframe.pythonanywhere.com/listings/comments/request/"+id);
  }

  async addComment(userComment,userRating,id){
    try{
      const result = await this.http.post("http://inframe.pythonanywhere.com/listing/comments/add", {
        comment: userComment,
        rating: userRating,
        listID: id
      });

     
      //comment added
      //result.fail

      console.log("new comment ---> ", result);
      return result;
    }catch(e){
      return e;
    }
  }

}
