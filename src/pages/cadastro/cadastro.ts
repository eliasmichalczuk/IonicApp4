import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';
import { Agendamento } from '../../providers/agendamentos';
import { Observable } from 'rxjs/Observable';


import { Storage } from '@ionic/storage';
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
    private _alertCtrl: AlertController,
    private _storage: Storage) {
    // this.carro = this.navParams.get('carroSelecionado');
    // this.precoTotal = this.navParams.get('precoTotal');
    this.carro =  {nome: "Gol Prata", preco: 25000};
    this.precoTotal = 25200;

    //foi criado apenas um alerta no construtor, assim o alerta é destruído
    //após a utilização
    // this._alerta 
  }

  agenda(){
    // console.log(this.nome);
    //verificação de dados inseridos
    if(!this.nome || !this.email || !this.endereco){
      this._alertCtrl.create({
        title: 'Aviso',
        subTitle: 'Preencha todos os campos!',
        buttons: [
          {
            text: 'Ok'
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
      enviado: false //confirmado e enviado, pois a api do cliente da erro a cada tres envios
    }
    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        {
          text: 'Ok', 
          //segundo argumento, handler
          handler: () => {
            //nao quero que a homepage fique em cima da pilha, nao quero backbuttom
            //definir como tela raiz
            //this.navCtrl.push()
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });//assim sempre funciona o alerta

    let mensagem = '';

    //necessário usar subscribe pois recebera resposta async
    this._agendamentosService.agenda(agendamento)
    //pega observable e retorna outro
    //proprio obs to agenda, executa apos tudo, rece como param, resposta do agenda
    .mergeMap((valor) => {
      //valor salvo antes de lançar erro
      let observable = this.salva(agendamento);
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
          this._alerta.present();//possível tipar o metodo para o  alerta, para gerar erros
          //de syntax
      }
    )
    .subscribe(
        //alert padrao
        () => mensagem = 'Agendamento realizado',
        (err: Error) => mensagem = err.message,
      );
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
  }

  //método para utilizar o storage
  salva(agendamento) {
    //recebe chave e valor
    // nao quer chamar minuto e segundo da data
    let chave = this.email + this.data.substr(0,10);
    //set retorna uma promise
    let promise = this._storage.set(chave, agendamento);

    //transforma em observable
    return Observable.fromPromise(promise);
  }
  //atualmento o salva e o agenda retornam um observable, preciso juntar os dois
}
