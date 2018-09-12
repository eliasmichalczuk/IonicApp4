import { NavLifecycles } from './../../utils/ionic/nav/nav-lifecycles';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { Carro } from '../../providers/carros';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CarrosServiceProvider } from '../../providers/carros-service/carros-service';
import { EscolhaPage } from '../escolha/escolha';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  
  public carros: Carro[];
  constructor(public navCtrl: NavController, 
    private http: HttpClient,
    private _loading: LoadingController,
    private alertCtrl: AlertController,
    private carrosService: CarrosServiceProvider) {
        
  }
  ionViewDidLoad(): void{
    this.carros = [
      {nome: 'vrum',preco: 89220}
    ];

    let loading = this._loading.create({
      content: 'Carregando'
    });

    loading.present();

    //carro[] informa que esta esperando resposta do tipo carro
  this.carrosService.lista()
  .subscribe(
    //primeiro callback
    (carros) => {
      this.carros = carros;
      loading.dismiss();
    },
    //segundo callback, subscribe aceita de erro
    (err: HttpErrorResponse) => {
        console.log(err);
        loading.dismiss();

          this.alertCtrl.create({
            title:'Falha na conexão',
            subTitle: 'Não foi possível carragar a lista, tente novamente mais tarde',
              buttons: [
                { text:'Ok' }
              ]
          }).present();//exibe o botao com present
    }
    );
  }
  
  selecionaCarro(carro: Carro){
    console.log(carro);
    this.navCtrl.push(EscolhaPage.name, //no ionic 3, quando a pagina é tirada do app.component
    //ela vira lazy, assim é necessário passar por aqui uma string com a página, ao inves da "variavel"
      //recebe um segundo parametro, propriedade js
      {
        carroSelecionado: carro
      }
      );
  }

  
}
