import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';

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
  private _alerta: Alert;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _agendamentosService: AgendamentosServiceProvider,
    private _alertCtrl: AlertController) {
    // this.carro = this.navParams.get('carroSelecionado');
    // this.precoTotal = this.navParams.get('precoTotal');
    this.carro =  {nome: "Gol Prata", preco: 25000};
    this.precoTotal = 25200;

    //retorna um alerta
    //foi criado apenas um alerta no construtor, assim o alerta é destruído
    //após a utilização
    // this._alerta = this._alertCtrl.create({
    //   title: 'Aviso',
    //   buttons: [
    //     {text: 'Ok'}
    //   ]
    // });
  }

  agenda(){
    // console.log(this.nome);

    let agendamento = {
      nomeC: this.nome,
      enderecoC: this.endereco,
      emailC: this.email,
      modeloC: this.carro.nome,
      precoTotal: this.precoTotal
    }
    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        {text: 'Ok'}
      ]
    });//assim sempre funciona o alerta

    //necessário usar subscribe pois recebera resposta async
    this._agendamentosService.agenda(agendamento)
    .subscribe(
      //alert padrao
      () => {
        this._alerta.setSubTitle("Agendamento realizado!");
        this._alerta.present();//possível tipar o metodo para o  alerta, para gerar erros
        //de syntax
      },
      () => {
        this._alerta.setSubTitle("Falha no agendamento!");
        this._alerta.present();
      }
    );
  }
}
