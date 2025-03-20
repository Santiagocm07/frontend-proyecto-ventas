import { Component } from '@angular/core';
import { ProductoModel } from '../../modelos/producto.model';
import { ParametrosService } from '../../servicios/parametros.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  listaRegistros: ProductoModel[] = [];

  constructor(
    private servicioParametrizacion: ParametrosService
  ){}

  ngOnInit(){
    this.servicioParametrizacion.listarRegistro().subscribe({
      next: (datos) => {
        this.listaRegistros = datos;
      },
      error: (err) => {

      }
    });
  }
}
