import { UsuarioServiceProvider } from './../../providers/usuario-service/usuario-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Usuario } from '../../models/usuario';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	email: string = 'joao@alura.com.br';
	senha: string = 'alura123';

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		private _usuarioService: UsuarioServiceProvider,
		private _alert: AlertController) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	efetuaLogin() {
		console.log(this.email);
		console.log(this.senha);
		this._usuarioService.efetuaLogin(this.email,this.senha)
							.subscribe(
								(usuario: Usuario) => {
									this.navCtrl.setRoot(HomePage);
								},
								() => {
									this._alert.create({
										title: 'Falha no login',
										subTitle: 'Email ou senha inválidos',
										buttons: [
											{text: 'Ok'}
										]
									}).present();
								}
							);

		this.navCtrl.setRoot(HomePage);
	}
}
