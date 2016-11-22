import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { ChecklistPage } from '../checklist/checklist';
import { ChecklistModel } from '../../models/ChecklistModel';
import { Data } from '../../providers/data';
import { Keyboard } from 'ionic-native';
import { IntroPage } from '../intro/intro';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-quicklistshome',
  templateUrl: 'quicklistshome.html'
})

export class QuickListsHomePage {

	checklists: ChecklistModel[] = [];

  constructor(public nav: NavController, public dataService: Data, public alertCtrl: AlertController
  	, public storage: Storage, public platform: Platform) {
    
  }

  ionViewDidLoad(){

    this.platform.ready().then(() => {

      // Check to display IntroPage
      this.storage.get('introShown').then((result) => {
        if(!result){
          this.storage.set('introShown', true);
          this.nav.setRoot(IntroPage);
        }
        
      });

      // return promise
      this.dataService.getData().then((checklists) => {

        let savedChecklists: any = false;

        if(typeof(checklists) != "undefined"){
          // decode JSON to array savedChecklists
          savedChecklists = JSON.parse(checklists);
        }

        if(savedChecklists){

          // loop every item in array savedChecklists
          savedChecklists.forEach((savedChecklist) => {

            // create new ChecklistModel base on each data
            // this event for Observe abilities
            let loadChecklist = new ChecklistModel(savedChecklist.title,savedChecklist.created_date ,savedChecklist.items);

            // push ChecklistModel to this.checklists
            this.checklists.push(loadChecklist);

            // Observe checklist and save
            loadChecklist.checklist.subscribe(update => {
              this.save();
            });

          });// end savedCheckLists.forEach

        }

      }); // end data service.getData().then

    }); // end platform.ready()then

  }

viewChecklist(checklist){
      this.nav.push(ChecklistPage, {
      checklist: checklist
    });
}

renameChecklist(checklist){
    let prompt = this.alertCtrl.create({
      title: 'Rename Checklist',
      message: 'Enter the new name of this checklist below:',
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

            let index = this.checklists.indexOf(checklist);

            if(index > -1){
              this.checklists[index].setTitle(data.name);
              this.save();
            }

          }
        }
      ]
    });

    prompt.present();
}

removeChecklist(checklist){
    let index = this.checklists.indexOf(checklist);

    if(index > -1){
      this.checklists.splice(index, 1);
      this.save();
    }
}

addChecklist(): void {
  let prompt = this.alertCtrl.create({
    title: 'New Checklist',
    message: 'Enter the name of your new checklist below:',
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
          let newChecklist = new ChecklistModel(data.name, this.currentDate(),[]);
          this.checklists.push(newChecklist);

          newChecklist.checklist.subscribe(update => {
            this.save();
          });

          this.save();
        }
      }
    ]
  });

  prompt.present();
}

save(){
    Keyboard.close();
    this.dataService.save(this.checklists);  	
}

currentDate():string{
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    let todaystr = dd+'/'+mm+'/'+yyyy+' '+today.getHours()+':'+today.getMinutes()+':'+today.getMilliseconds();
    
    return todaystr;

 }

}
