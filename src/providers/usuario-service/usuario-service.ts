import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';


@Injectable()
export class UsuarioServiceProvider {

  private _usuarioLogado: Usuario;

  constructor(private _http: HttpClient) {
  }

  efetuaLogin(email, senha) {
    //enviado dados para a api
    //cast de usuario para indicar o tipo, por que usuario recebe tipo objet como padrao
    //post do http retorna um observable
    return this._http.post<Usuario>('http://localhost:8080/api/login', {email, senha})
    //do pega o usuario retornado pela api, e salva no _usuarioLogado
    //do apenas é executado em caso de sucesso
              .do((usuario: Usuario) => this._usuarioLogado = usuario);
  }

  get usuarioLogado() {
    return this._usuarioLogado;
  }

}
