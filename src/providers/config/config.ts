import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {

  constructor(  ) {
    console.log('Hello ConfigProvider Provider');
  }

  private config = {
    showSlide: false,
    name: "",
    username: ""
  }

  getConfigdata(): any{
    return localStorage.getItem("config");
  }

  setConfigData(showSlide?: boolean, name?: string, username?:string) {
    let config = {
      showSlide: false,
      name: "",
      username: ""
    };
    if(showSlide){
      config.showSlide = showSlide;
    }
    if(name){
      config.name = name;
    }
    if(username){
      config.username = username;
    }
    localStorage.setItem("config", JSON.stringify(config));
  }
}
