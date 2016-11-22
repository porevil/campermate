import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the MemoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-memo-page',
  templateUrl: 'memo-page.html'
})
export class MemoPage {

  item : any;
  checklist : any;
  //memo : string;
  constructor(public nav: NavController, public navParams: NavParams) {
    this.item = navParams.get("item");
    this.checklist = navParams.get("checklist");
    console.log('MemoPage item : '+this.item.title);
  }

  ionViewDidLoad() {
    console.log('Hello MemoPage Page');
  }

  add_memo(item){
    console.log('add_memo : '+this.item.memo);
    this.checklist.setMemo(item,this.item.memo);
    this.nav.pop(MemoPage);

  }

}
