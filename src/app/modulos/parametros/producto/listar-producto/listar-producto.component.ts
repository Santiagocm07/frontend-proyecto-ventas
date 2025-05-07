import { Component } from '@angular/core';
import { ProductoModel } from '../../../../modelos/producto.model';
import { ProductoService } from '../../../../servicios/parametros/producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfiguracionPaginacion } from '../../../../config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-producto',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule, FormsModule, RouterModule],
  templateUrl: './listar-producto.component.html',
  styleUrl: './listar-producto.component.css'
})
export class ListarProductoComponent {
  listaRegistros:ProductoModel [] = [];
  pag = 1;
  total = 0;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;
  filtro: string = '';
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

  filtrarRegistros() {
    this.pag = 1;

    if(!this.filtro.trim()) {
      this.listarRegistros();
      return;
    }

    const quitarAcentos = (texto: string): string => 
      texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const filtroNormalizado = quitarAcentos(this.filtro.toLowerCase());

    // Al pasar listarRegistrosConFiltro como null este trae todos los productos
    this.servicioProductos.listarRegistrosConFiltro(null).subscribe({
      next: (datos) => {
        this.listaRegistros = datos.filter(producto => 
          // producto.nombre?.toLowerCase().includes(this.filtro.toLowerCase()) ||
          quitarAcentos(producto.nombre?.toLowerCase() || "").includes(filtroNormalizado) ||
          producto.precioVenta?.toString().includes(this.filtro.toLowerCase()) ||
          producto.cantidadDisponible?.toString().includes(this.filtro.toLowerCase())
        );

        // Desactivar la paginación
        this.total = this.listaRegistros.length;
      },
      error: (err) => {
        alert("Error al filtrar productos");
      }
    });
  }

}
