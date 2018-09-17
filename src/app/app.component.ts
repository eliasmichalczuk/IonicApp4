import { UsuarioServiceProvider } from './../providers/usuario-service/usuario-service';
import { PerfilPage } from './../pages/perfil/perfil';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';
import { ConfigProvider } from '../providers/config/config';

import 'rxjs/add/operator/map';
import { ListaAgendamentosPage } from '../pages/lista-agendamentos/lista-agendamentos';

@Component({
  selector: 'myapp',
  templateUrl: 'app.html',
  providers: [
	ConfigProvider
  ]
})
export class MyApp {
  rootPage: any = IntroPage;
  navCtrl: any;
  //recupera o elemento do template
  @ViewChild(Nav) public nav: Nav;

  public paginas = [
	{ titulo: 'Agendamentos', pagina: ListaAgendamentosPage.name, icone: 'calendar'},
	{ titulo: 'Perfil', pagina: PerfilPage.name, icone: 'contact'}
  ];

  constructor(platform: Platform,
	statusBar: StatusBar,
	splashScreen: SplashScreen,
  configProvider: ConfigProvider,
  private _usuarioService: UsuarioServiceProvider) {
	platform.ready().then(() => {
	  // Okay, so the platform is ready and our plugins are available.
	  // Here you can do any higher level native things you might need.
	  let config = configProvider.getConfigdata();
	  console.log(config);
	  if(config == null){
		this.rootPage = IntroPage;
		configProvider.setConfigData(false);
	  }else{
		this.rootPage = TabsPage;
	  }
	  statusBar.styleDefault();
	  splashScreen.hide();
	});
  }

  irParaPagina(componente){
	this.nav.push(componente);
  }

  get usuarioLogado() {
    return this._usuarioService.usuarioLogado;
  }
}
