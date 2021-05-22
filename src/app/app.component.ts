import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Loja de Produtos';
  developer = 'Roberto Molina'

  @Input() ShowGridEdit: boolean;
  @Input() ShowGridCad: boolean;

  
}