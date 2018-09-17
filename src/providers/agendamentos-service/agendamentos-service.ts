import { ApiServiceProvider } from './../api-service/api-service';
import { Agendamento } from './../agendamentos';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

@Injectable()
export class AgendamentosServiceProvider {

  private _url: string;

  constructor(private _http: HttpClient,
              private _api: ApiServiceProvider) {
              this._url = this._api.url;
  }

  agenda(agendamento: Agendamento) {
    return this._http
                .post(this._url+'/agendamento/agenda', agendamento)
                //faz uma ação em um obj
                //aqui retorna o objeto com enviado true
                //ao erro do post, o do não é executado, pois isso
                //o storage nao recebe o valor
                .do(() => agendamento.enviado = true)
                //catch recebe o erro gerado no post com falha
                .catch((err) => Observable.of(new Error('Falha no agendamento!')));
  }
  // O operador catch() do RxJS é acionado quando ocorre uma
  // exceção no fluxo assíncrono. Ele recebe como parâmetro
  //  o erro ocorrido e deve retornar um Observable, podendo
  //  assim dar tratamento correto em caso de algo não sair como esperado.

  // O padrão de projeto DAO nesse projeto, foi implementado através de um
  // serviço que pode ser injetado em qualquer ponto do nosso sistema.
}
