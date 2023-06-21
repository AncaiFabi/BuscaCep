import { Component } from '@angular/core';
import { MeucepService } from '../services/meucep.service';
import {
  AlertController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { EnderecosService } from '../services/enderecos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dados: any = {};
  endereco = {
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
  };
  
  LabelBotao = 'Cadastrar';
  constructor(
    public mensagem: ToastController,
    public nav: NavController,
    private cep: MeucepService,
    public servico: EnderecosService
  ) {}

  ionViewDidEnter() {
    this.limpaDados();
  }

  searchCEP(evento: any) {
    const cepDig = evento.detail.value;

    if (cepDig.length == 8) {
      this.cep.localizaCep(cepDig).subscribe(
        (resp) => {
          this.dados = resp;
          if (!this.dados || this.dados.erro) {
            this.exibeToast('CEP não encontrado', 'warning');
          } else {
            this.endereco.endereco = this.dados.logradouro;
            this.endereco.bairro = this.dados.bairro;
            this.endereco.cidade = this.dados.localidade;
            this.endereco.estado = this.dados.uf;
            console.log(this.endereco);
          }
        },
        (erro) => {
          this.exibeToast('CEP não encontrado', 'warning');
        }
      );
    }
  }

  cadastrar() {
    if (
      this.endereco.cidade == '' ||
      this.endereco.estado == '' ||
      this.endereco.endereco == '' ||
      this.endereco.cep == '' ||
      this.endereco.bairro == ''
    ) {
      this.exibeToast('Preencha os campos necessários', 'danger');
    } else {
      this.salvamento();
      this.nav.navigateForward('conclusao');
    }
  }

  salvamento() {
    //  const copia = JSON.parse(JSON.stringify())
    // this.enderecos.push(this.endereco);
    this.servico.salvarEndereco(
      this.endereco.endereco,
      this.endereco.numero,
      this.endereco.cep,
      this.endereco.complemento,
      this.endereco.bairro,
      this.endereco.cidade,
      this.endereco.estado
    );

    this.nav.navigateRoot('conclusao');
  }

  limpaDados() {
    this.LabelBotao = 'Cadastrar';
    this.endereco.endereco = '';
    this.endereco.numero = '';
    this.endereco.complemento = '';
    this.endereco.bairro = '';
    this.endereco.cep = '';
    this.endereco.cidade = '';
    this.endereco.estado = '';
  }

  // editar() {
  //   this.LabelBotao = 'Editar';
  //   this.endereco.endereco = localStorage.getItem('endereco')!;
  //   this.endereco.numero = localStorage.getItem('numero')!;
  //   this.endereco.complemento = localStorage.getItem('com')!;
  //   this.endereco.bairro = localStorage.getItem('bairro')!;
  //   this.endereco.cep = localStorage.getItem('cep')!;
  //   this.endereco.cidade = localStorage.getItem('cidade')!;
  //   this.endereco.estado = localStorage.getItem('estado')!;
  // }

  async exibeToast(msg: string, cor: string) {
    const toast = await this.mensagem.create({
      message: msg,
      duration: 2000,
      position: 'top',
      animated: true,
      color: cor,
    });

    toast.present();
  }
}
