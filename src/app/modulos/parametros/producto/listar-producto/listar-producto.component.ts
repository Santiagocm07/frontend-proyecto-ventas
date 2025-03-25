import { Component } from '@angular/core';
import { ProductoModel } from '../../../../modelos/producto.model';
import { ParametrosService } from '../../../../servicios/parametros/producto.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfiguracionPaginacion } from '../../../../config/configuracion.paginacion';

@Component({
  selector: 'app-listar-producto',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './listar-producto.component.html',
  styleUrl: './listar-producto.component.css'
})
export class ListarProductoComponent {
  listaRegistros:ProductoModel [] = [];
  pag = 1;
  total = 0;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;
  constructor(
    private servicioProductos: ParametrosService
  ){}

  ngOnInit(){
    this.listarRegistros();
  }

  listarRegistros() {
    this.servicioProductos.listarRegistrosPaginados(this.pag).subscribe({
      next: (datos) => {
        this.listaRegistros = datos.registros;
        this.total = datos.totalRegistros;
      },
      error: (err) => {
        alert("Error leyendo los productos")
      }
    });
  }

}
