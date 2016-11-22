import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '../../providers/data';

/*
  Generated class for the MyDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-details',
  templateUrl: 'my-details.html'
})
export class MyDetailsPage {

  myDetailsForm: FormGroup;

  constructor(public nav: NavController, public platform: Platform, public formBuilder: FormBuilder, public dataService: Data) {

    this.myDetailsForm = formBuilder.group({
      carRegistration: [''],
      trailerRegistration: [''],
      trailerDimensions: [''],
      phoneNumber: [''],
      notes: ['']
    });

  }

  saveForm(): void {
    let data = this.myDetailsForm.value;
    this.dataService.setMyDetails(data);
  }

  ionViewDidLoad() {

    console.log('Hello MyDetails Page');

    this.platform.ready().then(() => {

      this.dataService.getMyDetails().then((details) => {

        let savedDetails: any = false;

        if (details && typeof (details) != "undefined") {
          savedDetails = JSON.parse(details);
        }

        let formControls: any = this.myDetailsForm.controls;

        if (savedDetails) {
          formControls.carRegistration.setValue(savedDetails.carRegistration);
          formControls.trailerRegistration.setValue(savedDetails.trailerRegistration);
          formControls.trailerDimensions.setValue(savedDetails.trailerDimensions);
          formControls.phoneNumber.setValue(savedDetails.phoneNumber);
          formControls.notes.setValue(savedDetails.notes);
        }

      });

    });

  }

}
