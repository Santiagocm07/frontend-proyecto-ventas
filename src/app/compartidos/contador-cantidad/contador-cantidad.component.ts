import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contador-cantidad',
  imports: [CommonModule, RouterModule],
  templateUrl: './contador-cantidad.component.html',
  styleUrl: './contador-cantidad.component.css'
})
export class ContadorCantidadComponent {
  numero = signal(1);
  @Output() cantidadCambiada = new EventEmitter<number>();

  actualizarNumero(diferencias:number) {
    this.numero.set(Math.max(this.numero()+diferencias,1));
    this.cantidadCambiada.emit(this.numero());
  }

}
