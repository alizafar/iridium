import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dash',
  templateUrl: 'dash.html',
})
export class DashPage {

  roles : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  this.roles = [
      { 'roleId' : 'WA', 'roleName' : 'Working Attorney'},
      { 'roleId' : 'MBA', 'roleName' : 'Billing Attorney'}  
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashPage');
  }

}
