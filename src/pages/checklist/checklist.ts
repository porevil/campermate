import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { MemoPage } from '../memo-page/memo-page';
/*
  Generated class for the Checklist page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checklist',
  templateUrl: 'checklist.html'
})
export class ChecklistPage {

  checklist: any;
  checked_item: number = 0;
	unchecked_item: number = 0;
  all_item: number = 0;

  constructor(public nav: NavController, public navParams: NavParams, public alertCtrl: AlertController){
		this.checklist = this.navParams.get('checklist');
		this.checklist.items.forEach((item) => {
			if(item.checked){
				this.checked_item++;
				console.log('this.checked_item '+this.checked_item)
			}else{
				this.unchecked_item++;
				console.log('this.unchecked_tiem '+this.unchecked_item)
			}

		});

	}

  ionViewDidLoad() {
    console.log('Hello Checklist Page');
  }

uncheckItems(){
    this.checklist.items.forEach((item) => {
			if(item.checked){
				this.checklist.toggleItem(item);
				console.log('unchecked_item : '+this.unchecked_item)
			}else{
				console.log('checked_item : '+this.checked_item)
			}
		});
}

addItem(){
	    let prompt = this.alertCtrl.create({
	      title: 'Add Item',
	      message: 'Enter the name of the task for this checklist below:',
	      inputs: [
	        {
	          name: 'name'
	        }
	      ],
	      buttons: [
	        {
	          text: 'Cancel'
	        },
	        {
	          text: 'Save',
	          handler: data => {
		 		       this.checklist.addItem(data.name);
	          }
	        }
	      ]
	    });

	    prompt.present();
}

toggleItem(item){
  this.checklist.toggleItem(item);
	if (item.checked) {
		this.checked_item++;
		console.log('item checked')
	}else{
		this.checked_item--;
		console.log('item unchecked')
	}
}

renameItem(item){
	    let prompt = this.alertCtrl.create({
	      title: 'Rename Item',
	      message: 'Enter the new name of the task for this checklist below:',
	      inputs: [
	        {
	          name: 'name'
	        }
	      ],
	      buttons: [
	        {
	          text: 'Cancel'
	        },
	        {
	          text: 'Save',
	          handler: data => {
		 		this.checklist.renameItem(item, data.name);
	          }
	        }
	      ]
	    });

	    prompt.present();
}

removeItem(item){
  this.checklist.removeItem(item);
}

show_memo(item){
	console.log('show memo for item : '+item.title)
	this.nav.push(MemoPage, {
      item: item,
			checklist: this.checklist
    });
	//var memo_btn = document.getElementById("memo_btn");
	//memo_btn.style.display = "block"; 
}

}
