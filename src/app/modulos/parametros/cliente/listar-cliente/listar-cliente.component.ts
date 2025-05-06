import { Component } from '@angular/core';
import { PaginadorClienteModel } from '../../../../modelos/paginador.cliente.model';
import { ClienteService } from '../../../../servicios/parametros/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteModel } from '../../../../modelos/cliente.model';
import { ConfiguracionPaginacion } from '../../../../config/configuracion.paginacion';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-listar-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule, FormsModule],
  templateUrl: './listar-cliente.component.html',
  styleUrl: './listar-cliente.component.css'
})
export class ListarClienteComponent {
  listaRegistros: ClienteModel[] = [];
  pag: number = 1;
  total: number = 0;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;
  filtro: string = '';

  constructor(
    private servicio: ClienteService
  ){}

  ngOnInit(){
    this.listarRegistros();
  }

  listarRegistros(){
    this.servicio.listarRegistros(this.pag).subscribe({
      next: (datos) => {
        this.listaRegistros = datos.registros;
        this.total = datos.totalRegistros;
      },
      error: (err) => {
        console.error("Error en la solicitud:", err);
        alert("Error leyendo los clientes")
      }
    });
  }

  filtarClientes() {
    if (!this.filtro.trim()){
      this.listarRegistros(); //Si el input esta vacío se llama a listarRegistros para volver a mostrar todos los clientes
      return;
    }

    const palabras = this.filtro.toLowerCase().split(' ').filter(p => p);
    this.servicio.listarClienteConFiltro(null).subscribe({
      next: (datos) => {
        const clientes = (datos as any).registros || [];
        this.listaRegistros = clientes.filter((cliente: ClienteModel) => {
          const busquedaCliente = `
          ${cliente.primerNombre || ''}
          ${cliente.segundoNombre || ''}
          ${cliente.primerApellido || ''}
          ${cliente.segundoApellido || ''}
          ${cliente.celular || ''}
          ${cliente.correo || ''}
          ${cliente.direccion || ''}`.toLowerCase();

          return palabras.every(palabra => busquedaCliente.includes(palabra));
        });
      },
      error: (err) => {
        alert("Error al filtrar los clientes");
      }
    });
  }

}
