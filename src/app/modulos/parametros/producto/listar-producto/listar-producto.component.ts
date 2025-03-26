import { Component } from '@angular/core';
import { ProductoModel } from '../../../../modelos/producto.model';
import { ProductoService } from '../../../../servicios/parametros/producto.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfiguracionPaginacion } from '../../../../config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';

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
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;
  constructor(
    private servicioProductos: ProductoService
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
