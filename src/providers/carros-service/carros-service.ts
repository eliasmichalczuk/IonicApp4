import { ApiServiceProvider } from './../api-service/api-service';
import { Carro } from '../../models/carros';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CarrosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarrosServiceProvider {

  _url: string;
  constructor(public http: HttpClient,
              private _api: ApiServiceProvider) {
              this._url = this._api.url;
  }

  lista(){
    return this.http.get<Carro[]>(this._url+'/carro/listaTodos');
  }

}
