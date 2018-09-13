import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public carro;
  public precoTotal: number;

  public nome: string = '';
  public endereco: string = '';
  public email: string = '';
  public data: string = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.carro = this.navParams.get('carroSelecionado');
    // this.precoTotal = this.navParams.get('precoTotal');
    this.carro =  {nome: "Gol Prata", preco: 25000};
    this.precoTotal = 25200;
  }

  agenda(){
    console.log(this.nome);
  }
}
