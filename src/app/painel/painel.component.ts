import { Component, ViewChild } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { TentativasComponent } from '../tentativas/tentativas.component';
import { frases_array } from './frase-mock';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SuccessComponent } from '../modals/success/success.component';
import { FailureComponent } from '../modals/failure/failure.component';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})

export class PainelComponent {
  public frases: Frase[] = frases_array //Array que contém frases ENG e PTBR
  public instrucao: String = 'Traduza a frase:'
  public respostaUsuario: String = ''
  public rodada: number = 0
  public rodadaFrase: Frase = new Frase()
  public progresso: number = 0
  public readonly configModal: ModalOptions =
  {
    class: 'modal-lg',
    ignoreBackdropClick: false,
    backdrop: 'static',
    show: true,
    keyboard: true,
  }

  @ViewChild(TentativasComponent) tentativasComponent = new TentativasComponent
  /*tentativasComponente é um objeto da classe TentativasComponent.
  Através de @ViewChild é possível enviar valores do componente pai para o componente
  filho se receberá lá na classe um tipo Boolean.
  */

  constructor(private readonly modalService: BsModalService) {
    this.atualizaResposta()
    //this.exibirModalSucesso() //Mensagem Ganhou
    //this.exibirModalFalhou() //Mensagem Perdeu
  }
  
  public atualizaResposta(): void {
    this.rodadaFrase = this.frases[this.rodada]
    this.limparTextarea()
  }

  public verificarResposta(): void {
    if(this.rodadaFrase.frasePtBr == this.respostaUsuario.toLowerCase()){
      this.rodada++ //Troca pergunta da rodada
      this.progresso += (100 / this.frases.length) //Porcentagem do progresso
      this.atualizaResposta() //Atualiza objeto rodadaFrase
      this.tentativasComponent.trocaCoracoes(false)
    } else {
      this.tentativasComponent.trocaCoracoes(true) 
    }
  }

  public limparTextarea() {
    this.respostaUsuario = '' //Limpa a entrada do usuário e atribui ao [value] do textarea no templateHTML
    const textarea = document.getElementById( "textarea" )
    textarea?.focus()//Sempre inicilizar com o cursor no textarea
  }

  private exibirModalSucesso()
	{
    let modalRef: BsModalRef
		modalRef = this.modalService.show(SuccessComponent, this.configModal);
		modalRef.content.modal = modalRef;
	}

  private exibirModalFalhou()
	{
    let modalRef: BsModalRef
		modalRef = this.modalService.show(FailureComponent, this.configModal);
		modalRef.content.modal = modalRef;
	}
}