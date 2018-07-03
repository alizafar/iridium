import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'
import { ToastController } from 'ionic-angular';


/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {


  endpoint: string = "values";

  data: any;
  errors: any;



  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public toastCtrl: ToastController) {

    this.restProvider.getData(this.endpoint).subscribe(result => this.data = result,
      err => {

          this.presentToast(err.message);



      });

    
    


  }

  presentToast(msg:string) {
    const toast = this.toastCtrl.create({
      message: msg,
      position: 'middle',
      showCloseButton: true
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }



}
