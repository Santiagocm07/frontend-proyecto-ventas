import { Component } from '@angular/core';
import { ProductoModel } from '../../../../modelos/producto.model';
import { ParametrosService } from '../../../../servicios/parametros.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-producto',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './listar-producto.component.html',
  styleUrl: './listar-producto.component.css'
})
export class ListarProductoComponent {
  listaRegistros:ProductoModel [] = [];
  constructor(
    private servicioParametros: ParametrosService
  ){}

  ngOnInit(){
    this.servicioParametros.listarRegistro().subscribe({
      next: (datos) => {
        this.listaRegistros = datos;
      },
      error: (err) => {
        alert("Error leyendo los productos")
      }
    });
  }

}
