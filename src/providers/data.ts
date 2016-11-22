import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Data {
  
  getData(): Promise<any> {
    return this.storage.get('checklists');
  }

  save(data: any): void {
    let saveData = [];
    //Remove observables
    data.forEach((checklist) => {
      saveData.push({
        title: checklist.title,
        items: checklist.items
      });
    });
    let newData = JSON.stringify(saveData);
    this.storage.set('checklists', newData);
  }

  constructor(public storage: Storage) {
    console.log('Hello Data Provider');
  }

  setMyDetails(data: Object): void {
    let newData = JSON.stringify(data);
    this.storage.set('mydetails', newData);
  }

  setCampDetails(data: Object): void {
    let newData = JSON.stringify(data);
    this.storage.set('campdetails', newData);
  }

  setLocation(data: Object): void {
    let newData = JSON.stringify(data);
    this.storage.set('location', newData);
  }

  getMyDetails(): Promise<any> {
    return this.storage.get('mydetails');
  }

  getCampDetails(): Promise<any> {
    return this.storage.get('campdetails');
  }

  getLocation(): Promise<any> {
    return this.storage.get('location');
  }

}
