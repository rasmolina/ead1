import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from './Produto';
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebService {

  baseURL = "https://banco-dados-teste.glitch.me/api";

  //Chamada assíncrona da lista de produtos
  getProdutos() : Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseURL + "/produtos");
  }


  //Função para cadastrar um produto - POST
  cadastrarProduto(produto) : Observable<any>{
    let body = new HttpParams();
    body = body.set("title", produto.title);
    body = body.set("price", String(produto.price));
    body = body.set("description", produto.description);
    return this.http.post(this.baseURL + "/produtos", body, {observe: "response"});
  }

  //Função para resgatar um produto específico - GET
  getProdutoId(id: string): Observable<Produto>{
    return this.http.get<Produto>(this.baseURL + "/produtos/" + id);
    
  }

  //Função para atualizar um produto - PUT
  atualizaProduto(id: string, produto) : Observable<any>{
    return this.http.put<Produto>(this.baseURL + "/produtos/" + id, produto);
  }

  //Função para deletar um produto - DELETE
  deletaProduto(id: string, produto) : Observable<any>{
    return this.http.delete<Produto>(this.baseURL + "/produtos/" + id, produto);
  }


  //injeta a dependência http que é do tipo HttpClient
  constructor(private http : HttpClient) { }
}
