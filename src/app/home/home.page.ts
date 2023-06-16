import { Component } from '@angular/core';
import {MeucepService} from '../services/meucep.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home-page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor
  (public mensagem: AlertController,
    public nav: NavController,
    private cep: MeucepService
    ) {}

    searchCEP(evento){
      const cepDig = evento.detail.value;
    }

}
