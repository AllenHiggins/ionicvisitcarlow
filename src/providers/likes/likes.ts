import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class LikesProvider {
  private list: any;

  constructor(
    public http: HttpClient,
    public Storage: Storage) {
    console.log('Hello LikesProvider Provider');
  }

  addToLikes(place){
    this.list.push(place);
    this.Storage.set('likeList', this.list);
    return this.http.get("http://inframe.pythonanywhere.com/likes/add/" + place.id);
  }

  unLike(id){
    for(var i = 0; i < this.list.length ; i++){
      if(this.list[i].id == id){
         this.list.splice(i,1);    
      }
    }
    this.Storage.set('likeList', this.list); 
    return this.http.get("http://inframe.pythonanywhere.com/likes/remove/" + id);
  }

  getLikeList(){
    return this.Storage.get('likeList')
    .then((list) =>{
      this.list = list == null ? [] : list;
      return this.list.slice();
    });
  }

}
