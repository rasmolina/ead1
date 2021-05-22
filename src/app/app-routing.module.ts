import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent} from './listar/listar.component';
import { CadastrarComponent} from './cadastrar/cadastrar.component';
import { EditarComponent} from './editar/editar.component';
import { Routes, RouterModule } from '@angular/router';
import { DeletarComponent } from './deletar/deletar.component';

const routes : Routes = [
  {path: "listagem", component: ListarComponent},
  {path: "cadastro", component: CadastrarComponent},
  {path: "edicao/:id", component: EditarComponent}, //passo o parâmetro id na rota
  {path: "delecao/:id", component: DeletarComponent},
  {path: "", redirectTo: "/listagem", pathMatch: "full"}
];



@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
