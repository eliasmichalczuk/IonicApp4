import { Agendamento } from '../../models/agendamentos';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';


@Injectable()
export class AgendamentoDaoProvider {

  constructor(private _storage: Storage) {
  }

  private _geraChave(agendamento: Agendamento){
    return agendamento.emailC + agendamento.data.substr(0,10);
  }

  salva(agendamento: Agendamento) {
    //recebe chave e valor
    // nao quer chamar minuto e segundo da data
    let chave = this._geraChave(agendamento);
    //set retorna uma promise
    let promise = this._storage.set(chave, agendamento);

    //transforma em observable
    return Observable.fromPromise(promise);
  }
  //método para utilizar o storage
  //atualmento o salva e o agenda retornam um observable, preciso juntar os dois

  ehDuplicado(agendamento: Agendamento) {
    let chave = this._geraChave(agendamento);
    //é uma promise
    let promise = this._storage.get(chave)
                               .then(dado => dado ? true : false);
    return Observable.fromPromise(promise);
  }

  listaTodos(){
    let agendamentos: Agendamento[] = [];

    //foreach recebe um callback, cada parametro do callback
    //será um agendamento
    let promise = this._storage.forEach((agendamento: Agendamento) => {
      //foreach tambem retorna promise
      agendamentos.push(agendamento);
    })
    .then(() => agendamentos);

    return Observable.fromPromise(promise);
  }
}
