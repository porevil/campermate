import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '../../providers/data';

/*
  Generated class for the CampDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-camp-details',
  templateUrl: 'camp-details.html'
})
export class CampDetailsPage {

  campDetailsForm: FormGroup;

  constructor(public navCtrl: NavController, public platform: Platform,
    public formBuilder: FormBuilder, public dataService: Data) {

    this.campDetailsForm = formBuilder.group({
      gateAccessCode: [''],
      ammenitiesCode: [''],
      wifiPassword: [''],
      phoneNumber: [''],
      departure: [''],
      notes: ['']
    });

  }

  saveForm(): void {
    // This will return an object that contains all of the values
    let data = this.campDetailsForm.value;
    this.dataService.setCampDetails(data);
  }

  ionViewDidLoad() {
    console.log('Hello CampDetails Page');
    this.platform.ready().then(() => {

      this.dataService.getCampDetails().then((details) => {
        let savedDetails: any = false;
        if (details && typeof (details) != "undefined") {
          savedDetails = JSON.parse(details);
        }
        
        let formControls: any = this.campDetailsForm.controls;

        if (savedDetails) {
          formControls.gateAccessCode.setValue(savedDetails.gateAccessCode);
          formControls.ammenitiesCode.setValue(savedDetails.ammenitiesCode);
          formControls.wifiPassword.setValue(savedDetails.wifiPassword);
          formControls.phoneNumber.setValue(savedDetails.phoneNumber);
          formControls.departure.setValue(savedDetails.departure);
          formControls.notes.setValue(savedDetails.notes);
        }

      });//get CampDetails

    });//platform is ready

  }

}
