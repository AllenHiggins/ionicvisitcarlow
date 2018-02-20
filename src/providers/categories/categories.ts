import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoriesProvider {

  constructor(public http: HttpClient) {
    
  }

  getCategories = () => {
    return this.http.get("http://inframe.pythonanywhere.com/category");
  }
}
