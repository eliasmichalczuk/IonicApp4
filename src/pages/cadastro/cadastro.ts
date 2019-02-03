import { AgendamentoDaoProvider } from './../../providers/agendamento-dao/agendamento-dao';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';
import { Agendamento } from '../../models/agendamentos'

import { Carro } from '../../models/carros';
import 'rxjs/add/operator/mergeMap';
import { DatePicker } from '@ionic-native/date-picker';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})

export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;
  public nome: string = '';
  public endereco: string = '';
  public email: string = '';
  public data: string = new Date().toISOString();
  private _alerta: Alert;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _agendamentosService: AgendamentosServiceProvider,
    private _alertCtrl: AlertController,
    private _agendamentoDao: AgendamentoDaoProvider,
    //private _vibration: Vibration
    private _datePicker: DatePicker) {
    this.carro = this.navParams.get('carroSelecionado');
    this.precoTotal = this.navParams.get('precoTotal');
    //this.carro =  {nome: "Gol Prata", preco: 25000};
    // this.precoTotal = 25200;

    //foi criado apenas um alerta no construtor, assim o alerta é destruído
    //após a utilização
  }

  agenda(){
    // console.log(this.nome);
    //verificação de dados inseridos
    if(!this.nome || !this.email || !this.endereco){
      //this._vibration.vibrate(200);

      this._alertCtrl.create({
        title: 'Aviso',
        subTitle: 'Preencha todos os campos!',
        cssClass: 'test-alert-negative',
        buttons: [
          {
            text: 'Ok',
            cssClass: 'test-ok-button-negative'
          }
        ]
      }).present();

      return;
    }

    let agendamento: Agendamento = {
      nomeC: this.nome,
      enderecoC: this.endereco,
      emailC: this.email,
      modeloC: this.carro.nome,
      precoTotal: this.precoTotal,
      confirmado: false,
      enviado: false, //confirmado e enviado, pois a api do cliente da erro a cada tres envios
      data: this.data
    }
    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'test-ok-button-positive',
          //segundo argumento, handler
          handler: () => {
            //nao quero que a homepage fique em cima da pilha, sem backbuttom
            //definir como tela raiz
            //this.navCtrl.push()
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });

    let mensagem = '';

    this._agendamentoDao.ehDuplicado(agendamento)
      .mergeMap(ehDuplicado => {
        if(ehDuplicado) {
          throw new Error('Agendamento existente!');
        }

        return this._agendamentosService.agenda(agendamento);
      })
    //necessário usar subscribe pois recebera resposta async

    //pega observable e retorna outro
    //proprio obs to agenda, executa apos tudo, rece como param, resposta do agenda
    .mergeMap((valor) => {
      //valor salvo antes de lançar erro
      let observable = this._agendamentoDao.salva(agendamento);
      //se valor for do tipo erro
      if(valor instanceof Error){
        //lançar erro
        throw valor;
      }
      return observable;
    })
    //atualmente, não é salvo no db os agendamentos não enviados devido a erro

    //callback executa sempre que o observable termina
    //finaly nao vem habilitado por padrao, necessario importar no app module
    .finally(
      () => {
          this._alerta.setSubTitle(mensagem);
          this._alerta.setCssClass('test-alert-positive');
          this._alerta.present();
      }
    )
    .subscribe(
        //alert padrao
        () => mensagem = 'Agendamento realizado',
        (err: Error) => mensagem = err.message,
      );

  }

  selecionaData() {
    this._datePicker.show({
      date: new Date(),
      mode: 'date'
      //thid.data recebe data formatada
    }).then(data => this.data = data.toISOString());
  }
}
//substituido com a utilização do finally
    // .subscribe(
    //   //alert padrao
    //   () => {
    //     this._alerta.setSubTitle("Agendamento realizado!");
    //     this._alerta.present();//possível tipar o metodo para o  alerta, para gerar erros
    //     //de syntax
    //   },
    //   () => {
    //     this._alerta.setSubTitle("Falha no agendamento!");
    //     this._alerta.present();
    //   }
    // );
