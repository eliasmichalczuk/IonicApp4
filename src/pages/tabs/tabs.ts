import { LoginPage } from './../login/login';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { PerfilPage } from '../perfil/perfil';
import { ConfiguracoesPage } from '../configuracoes/configuracoes';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  //tab1Root = HomePage;
  tab1Root = LoginPage;
  //tab1Root = ListaAgendamentosPage.name;


  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = PerfilPage;
  tab5Root = ConfiguracoesPage;

  constructor() {

  }
}
