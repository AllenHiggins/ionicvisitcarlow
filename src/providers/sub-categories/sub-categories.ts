import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SubCategoriesProvider {

  constructor(public http: HttpClient) {
    
  }

  getSubCategories(title){
    return this.http.get('http://inframe.pythonanywhere.com/category/subList/'+title);
  }

}
