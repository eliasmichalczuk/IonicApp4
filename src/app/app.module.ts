import { Vibration } from '@ionic-native/vibration';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigProvider } from '../providers/config/config';
import { IntroPageModule } from '../pages/intro/intro.module';
import { PerfilPageModule } from '../pages/perfil/perfil.module';
import { ConfiguracoesPageModule } from '../pages/configuracoes/configuracoes.module';
import { HttpClientModule } from '@angular/common/http';
import { CarrosServiceProvider } from '../providers/carros-service/carros-service';
import { AgendamentosServiceProvider } from '../providers/agendamentos-service/agendamentos-service';
import { AgendamentoDaoProvider } from '../providers/agendamento-dao/agendamento-dao';

import { IonicStorageModule } from '@ionic/storage';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import { UsuarioServiceProvider } from '../providers/usuario-service/usuario-service';
import { ApiServiceProvider } from '../providers/api-service/api-service';

import { DatePicker } from '@ionic-native/date-picker';
//import { Vibration } from '@ionic-native/vibration';

/**
 * TODO: SEARCH SOLUTION MERGEMAP MODULE NOT FOUND
 * TODO: SOLVE VIBRATION dependencies
 */

 //ionic cordova plugin add cordova-plugin-vibration@2.1.6
//npm install --save @ionic-native/vibration
//ionic cordova plugin add cordova-plugin-datepicker@0.9
//npm install --save @ionic-native/datepicker



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IntroPageModule,
    PerfilPageModule,
    ConfiguracoesPageModule,
    HttpClientModule,
    // IonicStorageModule.forRoot({
    //   name: 'aluracar',
    //   storeName: 'agendamentos',
    //   //driverorder possui array com os bancos que quero trabalhar
    //   driverOrder: ['indexeddb']
    // })
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigProvider,
    CarrosServiceProvider,
    AgendamentosServiceProvider,
    AgendamentoDaoProvider,
    UsuarioServiceProvider,
    ApiServiceProvider,
    //Vibration,
    DatePicker
  ]
})
export class AppModule {}
