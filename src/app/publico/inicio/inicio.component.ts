import { Component } from '@angular/core';
import { ProductoModel } from '../../modelos/producto.model';
import { ProductoService } from '../../servicios/parametros/producto.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  listaRegistros: ProductoModel[] = [];
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;
  cantidadSeleccionada: number | string = this.registrosPorPagina;
  cantidades = [20, 50, 80, 'todos'];

  constructor(
    private servicio: ProductoService
  ){}

  ngOnInit(){
    this.listarRegistros();
  }

  listarRegistros(){
    if (this.cantidadSeleccionada === 'todos') {
      this.servicio.listarRegistrosConFiltro(null).subscribe({
        next: (datos) => {
          this.listaRegistros = [];
          this.listaRegistros = datos;
          // Ordenar productos alfabéticamente
          this.listaRegistros.sort((a, b) => a.nombre!.localeCompare(b.nombre!));
        },
        error: (err) => {
          alert("Error al cargar los productos");
        },
      });
    } else {
      this.servicio.listarRegistrosConFiltro(Number(this.cantidadSeleccionada)).subscribe({
        next: (datos) => {
          this.listaRegistros = [];
          this.listaRegistros = datos;

          this.listaRegistros.sort((a, b) => a.nombre!.localeCompare(b.nombre!));
        },
        error: (err) => {
          alert("Error al cargar los productos");
        },
      });
    }
  }

  cambiarCantidadSeleccionada(event: any) {
    this.cantidadSeleccionada = event.target.value;
    this.listarRegistros();
  }

}
