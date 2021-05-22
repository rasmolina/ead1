import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../Produto';
import { WebService } from '../web.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  
  produtoSelecionado : Produto;

  id: string;

  listaProdutos: Produto[];

  constructor(private web: WebService, 
    private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }



  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); //resgata o id da rota /edicao/:id e atribui à variável
    this.web.getProdutoId(this.id).subscribe(res => {
      this.produtoSelecionado = res;
    });

    
  }

  carregarProdutos() : void {
    this.web.getProdutos().subscribe(res => {
      this.listaProdutos = res;
    });
  }


  atualizar() {
    //validação
    if (!this.produtoSelecionado.title || !this.produtoSelecionado.price){
      return this.openSnackBar('Nome ou preço do produto em branco!');
    }else

    this.web.atualizaProduto(this.id, this.produtoSelecionado).subscribe(res =>{
      if(res.ok = true) {
        this.openSnackBar('Produto atualizado com sucesso!');
      } else {
        this.openSnackBar("O produto não pôde ser atualizado!");
      }

    });
    
    this.carregarProdutos();
    this.router.navigate(['/listagem']); // volto para a página de listagem
    
  }

  aviso(): void{
    this.openSnackBar("Utilize ponto ao invés de vírgula!");
  }


  cancelar() : void {
    this.router.navigate(['/listagem']); // volto para a página de listagem
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    })
  }


}
