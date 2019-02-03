import { ApiServiceProvider } from './../api-service/api-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';

const CHAVE = 'avatar';
@Injectable()
export class UsuarioServiceProvider {

  private _usuarioLogado: Usuario;
  _url: string;
  constructor(private _http: HttpClient,
              private _api: ApiServiceProvider) {
              this._url = this._api.url;
  }

  efetuaLogin(email, senha) {
    //enviado dados para a api
    //cast de usuario para indicar o tipo, por que usuario recebe tipo objet como padrao
    //post do http retorna um observable
    return this._http.post<Usuario>(this._url+'/login', {email, senha})
    //do pega o usuario retornado pela api, e salva no _usuarioLogado
    //do apenas é executado em caso de sucesso
              .do((usuario: Usuario) => this._usuarioLogado = usuario);
  }

  get usuarioLogado() {
    return this._usuarioLogado;
  }

  salvaAvatar(avatar) {
    localStorage.setItem(CHAVE, avatar);
  }

  obtemAvatar() {
    return localStorage.getItem(CHAVE)
                      ? localStorage.getItem(CHAVE)
                      : 'assets/img/avatar-padrao.jpg';
  }
}
