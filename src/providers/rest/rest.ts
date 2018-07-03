import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './../../services/auth.service';


/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = "https://mobile.jws.com.au/api/";


  constructor(public http: HttpClient, public auth: AuthService) { }

  getData(endpoint:string) {

    console.log('token:' + this.auth.accessToken);
    console.log(this.apiUrl + endpoint);

    return this.http.get(this.apiUrl + endpoint, {

      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.auth.accessToken)

    });


  }
}