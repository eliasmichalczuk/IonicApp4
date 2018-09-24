import { Observable } from 'rxjs/Observable';
import { UsuarioServiceProvider } from './../../providers/usuario-service/usuario-service';
import { Usuario } from './../../models/usuario';
import { Agendamento } from './../../models/agendamentos';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';
import { delay, take } from 'rxjs/operators';
import Rx, { Subject } from "rxjs/Rx";

import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  agendamentos: Agendamento[];
  usuario: Usuario;

  constructor(public navCtrl: NavController,
    private _agendamentoDao: AgendamentoDaoProvider,
    private _usuarioService: UsuarioServiceProvider) {
  }

  ionViewDidLoad(){
    let agen = this._agendamentoDao.listaTodos()
    .subscribe(
      (agendamentos: Agendamento[]) => {
        return agendamentos;
      }
    );

    //let user = this._usuarioService.usuarioLogado();
    const obs = Rx.Observable.forkJoin().subscribe(res => {return res;});

      console.log('observables: ');
      var button = document.querySelector('button');
      var observer = {
        next: function(value){
          console.log(value);
        }
      }
      //Rx.Observable.fromEvent(button,'click').subscribe(observer);

        Rx.Observable.create(function(obs){
          obs.next('a value');
          // onclick(obs.next('a  value'));
        }).subscribe(observer);


        console.log('merge map: ');
        const source = of('Hello');
        console.log(source);

        const example = source.pipe(mergeMap(val => of(`${val} World`)));
        //hello world
        const subscribe = example.subscribe(val => console.log(val));


        console.log('map, throrrle');

        let observable = Observable.interval(1000);

        let my = observable
        .map(function(value) {
          return value + 55;
        })
        .throttleTime(2000)
        .subscribe(observer);
        my.unsubscribe();

        console.log('event emitter: ');

        let subject = new Subject();
        //passar objeto com next, complete, ou lista de ojbetos
        subject.subscribe({
          next: function(value) {
            console.log(value);
          // },
          // error: function(error){
          //   console.log(error);
          // },
          // complete: function(){
          //   console.log('Complete');
          }
        });

        subject.subscribe({
          next: function(value) {
            console.log(value);
          }
        });
        subject.next('a new data piece');
  }

}
