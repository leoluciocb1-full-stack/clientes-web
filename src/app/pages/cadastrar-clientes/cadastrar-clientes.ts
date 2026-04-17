import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-cadastrar-clientes',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-clientes.html',
  styleUrl: './cadastrar-clientes.css',
})
export class CadastrarClientes {

  // Atributo para armazenar os dados da consulta da API
  niveisCliente = signal<any[]>([]);

  //Instanciar a classe HttpClient
  http = inject(HttpClient);

  //Formulário para capturar os campos do cadastro do cliente
  formCadastro = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(150)]),
    cpf : new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    email : new FormControl('', [Validators.required, Validators.email]),
    telefone : new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
    nivel : new FormControl('', [Validators.required])
  });

  //Função executada ao abrir o componente
  ngOnInit() {
    //Fazendo uma chamada / requisição para o endpoint da api de clientes
    //para consultar as opções do enum de níveis de cliente.
    this.http.get('http://localhost:5106/api/enum/niveis-cliente')
      .subscribe((data) => {
        console.log(data);
        //Armazenar os dados da API na variável signal
        this.niveisCliente.set(data as any[]);
      });
  }
  //Função para capturar o evento de SUBMIT do formulário
  cadastrarCliente() {
    //Fazendo uma requisição POST para a API (Cadastro do cliente)
    this.http.post('http://localhost:5106/api/v1/clientes', this.formCadastro.value)
      .subscribe({
        next : (data) => { //capturando o retorno de sucesso da API
          console.log(data);
        },
        error : (e) => { //capturando o retorno de erro da API
          console.log(e.error);
        }
      })
  }

}
