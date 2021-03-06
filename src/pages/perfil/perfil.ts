import { LoginPage } from './../login/login';
import { UsuarioServiceProvider } from './../../providers/usuario-service/usuario-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _usuarioService: UsuarioServiceProvider) {
  }

  get usuarioLogado() {
    return this._usuarioService.usuarioLogado;
  }

  logout() {
    this.navCtrl.setRoot(LoginPage);
  }
}
