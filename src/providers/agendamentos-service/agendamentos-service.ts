import { Agendamento } from './../agendamentos';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AgendamentosServiceProvider {

  private _url = 'http://localhost:8080/api';

  constructor(private _http: HttpClient) {
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
}
  