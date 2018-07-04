import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

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


  @ViewChild('barCanvas') barCanvas;
  @ViewChild('barCanvas2') barCanvas2;
  @ViewChild('barCanvas3') barCanvas3;

  barChart: any;
  barChart2: any;
  barChart3: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashPage');


    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
          label: null,
          data: [140, 180, 110, 200, 160, 140],
          backgroundColor: 'SkyBlue',
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Billable Hours R6'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: { display: false }
      }

    });

    this.barChart2 = new Chart(this.barCanvas2.nativeElement, {

      type: 'bar',
      data: {
        labels: ["Good", "OK", "Bad", "Extreme"],
        datasets: [{
          label: null,
          data: [125330, 46550, 39860, 28413],
          backgroundColor: [
            'rgba(0, 128, 0, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(178, 74, 74, 1)',
            'rgba(75, 0, 130, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: 'WIP Fees'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value, index, values) {
                value = value.toString();
                value = value.split(/(?=(?:...)*$)/);
                value = value.join(',');
                return value;
              }
            }
          }]
        },
        legend: { display: false }
      }

    });

    this.barChart3 = new Chart(this.barCanvas3.nativeElement, {

      type: 'bar',
      data: {
        labels: ["Good", "OK", "Bad", "Extreme"],
        datasets: [{
          label: null,
          data: [125330, 46550, 39860, 28413],
          backgroundColor: [
            'rgba(0, 128, 0, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(178, 74, 74, 1)',
            'rgba(75, 0, 130, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: 'AR Fees'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value, index, values) {
                value = value.toString();
                value = value.split(/(?=(?:...)*$)/);
                value = value.join(',');
                return value;
              }
            }
          }]
        },
        legend: { display: false }
      }

    });

  }



  goTo(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page);
  }

}
