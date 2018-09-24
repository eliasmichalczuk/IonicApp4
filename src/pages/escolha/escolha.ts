import { CadastroPage } from './../cadastro/cadastro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Carro } from '../../models/carros';
import { Acessorio } from '../../models/acessorio';


/**
 * Generated class for the EscolhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})
export class EscolhaPage {

  public carro: Carro;
  public acessorios: Acessorio[];
  private _precoTotal: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.navParams.get('carroSelecionado');
    this.carro = this.navParams.get('carroSelecionado');
    // this._precoTotal = 10000;
    this._precoTotal = this.carro.preco;
    // this.carro.preco;
    this.acessorios = [
        { nome: 'Freio ABS', preco: 800 },
        { nome: 'Ar-condicionado', preco: 1000 },
        { nome: 'MP3 Player', preco: 500 }
    ];
  }

  get precoTotal(){
    return this._precoTotal;
  }

  attPrecoAc(ativado:boolean, precoAcessorio:number){
    ativado ?
    this._precoTotal += precoAcessorio :
    this._precoTotal -= precoAcessorio;
  }

  public avancarCadastro(){
    this.navCtrl.push(CadastroPage.name,
    {
      carroSelecionado: this.carro,
      precoTotal: this._precoTotal
    });
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad EscolhaPage');
  // }
  //mesmo que o ng init

}
