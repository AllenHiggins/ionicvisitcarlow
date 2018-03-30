import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ReportcommentProvider {
  private list: any;

  constructor(
    public http: HttpClient,
    public toast:ToastController,
    public Storage: Storage) {
    console.log('Hello LikesProvider Provider');
  }

  report(id){
    this.list.push(id);
    this.Storage.set('reportComment', this.list);
    this.http.post("http://inframe.pythonanywhere.com/listing/comment/report",{
      commentID: id
    }).subscribe(
      res => {
        console.log(res);
        this.toast.create({
          message: "Comment Reported",
          duration: 3000
        }).present();
      },
      err => {
        console.log("Error occured");
        this.toast.create({
          message: "Unable to Report Comment at this time",
          duration: 3000
        }).present();
      }
    ); 
  }

  getReportList(){
    return this.Storage.get('reportComment')
    .then((list) =>{
      this.list = list == null ? [] : list;
      return this.list;
    });
  }
}
