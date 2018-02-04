import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SubCategoriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SubCategoriesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SubCategoriesProvider Provider');
  }

  getSubCategories(title){
    return this.http.get('http://inframe.pythonanywhere.com/category/subList/'+title);
  }

}
