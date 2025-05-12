import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contador-cantidad',
  imports: [CommonModule, RouterModule],
  templateUrl: './contador-cantidad.component.html',
  styleUrl: './contador-cantidad.component.css'
})
export class ContadorCantidadComponent {

  ngOnInit(): void {
    this.numero.set(this.cantidadInicial);
  }
  numero = signal(1);
  @Output() cantidadCambiada = new EventEmitter<number>();
  @Input() cantidadInicial = 1;
  @Input() cantidadMaxima?: number;

  // actualizarNumero(diferencias:number) {
  //   this.numero.set(Math.max(this.numero()+diferencias,1));
  //   this.cantidadCambiada.emit(this.numero());
  // }

  actualizarNumero(diferencias: number) {
    let nuevoValor = this.numero() + diferencias;

    if(this.cantidadMaxima !== undefined && nuevoValor > this.cantidadMaxima) {
      alert(`Lo sentimos, solo hay ${this.cantidadMaxima} unidades disponibles`);
      return;
    }

    this.numero.set(Math.max(nuevoValor, 1));
    this.cantidadCambiada.emit(this.numero());
  }

}
