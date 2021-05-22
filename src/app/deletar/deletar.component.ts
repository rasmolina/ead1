import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../Produto';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-deletar',
  templateUrl: './deletar.component.html',
  styleUrls: ['./deletar.component.css']
})
export class DeletarComponent implements OnInit {

  constructor(private web: WebService,
    private route: ActivatedRoute, private router: Router,private snackBar: MatSnackBar) { }

  id: string;
  produto: Produto;
  listaProdutos: Produto[];

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id'); //resgata o id da rota /edicao/:id e atribui à variável
    this.web.getProdutoId(this.id).subscribe(res => {
      this.produto = res;
    });

  }

  carregarProdutos() : void {
    this.web.getProdutos().subscribe(res => {
      this.listaProdutos = res;
    });
  }

  deletar(){
    this.web.deletaProduto(this.id, this.produto).subscribe(res =>{
      if(res.ok = true) {
        this.openSnackBar("Produto removido com sucesso!");
      } else {
        this.openSnackBar("O produto não pôde ser removido!");
      }
    });
    this.carregarProdutos();
    this.router.navigate(['/listagem']); // volto para a página de listagem

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
