import { Carro } from './../carros';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CarrosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarrosServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CarrosServiceProvider Provider');
  }

  lista(){
    return this.http.get<Carro[]>('http://localhost:8080/api/carro/listatodos');
  }

}
