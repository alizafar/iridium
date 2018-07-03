import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashPage } from './dash';

@NgModule({
  declarations: [
    DashPage,
  ],
  imports: [
    IonicPageModule.forChild(DashPage),
  ],
})
export class DashPageModule {}
