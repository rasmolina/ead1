import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';
import { Produto } from '../Produto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  produto = {title : "", price: 0.0, description: ""};

  listaProdutos: Produto[];

  constructor(private web : WebService, private snackBar: MatSnackBar, private router: Router) { }

  
  carregarProdutos() : void {
    this.web.getProdutos().subscribe(res => {
      this.listaProdutos = res;
    });
  }

  cadastrar() {
    if (!this.produto.title || !this.produto.price){
      return this.openSnackBar('Nome ou preço do produto em branco!');
    }else

    this.web.cadastrarProduto(this.produto).subscribe(res => {
      if(res.ok = true) {
        this.openSnackBar("O cadastro foi realizado com sucesso!");
      } else {
        this.openSnackBar("O cadastro não foi realizado!");
      }
    });
    
    this.carregarProdutos();
    this.router.navigate(['/listagem']); // volto para a página de listagem
  }

  cancelar(): void{
    this.router.navigate(['/listagem']); // volto para a página de listagem

  }

  aviso(): void{
    this.openSnackBar("Utilize ponto ao invés de vírgula!");
  }
  
  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    })
  }



  ngOnInit(): void {
  
  }

}
