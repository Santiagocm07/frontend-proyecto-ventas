import { Component } from '@angular/core';
import { PaginadorClienteModel } from '../../../../modelos/paginador.cliente.model';
import { ClienteService } from '../../../../servicios/parametros/cliente.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClienteModel } from '../../../../modelos/cliente.model';
import { ConfiguracionPaginacion } from '../../../../config/configuracion.paginacion';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-listar-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './listar-cliente.component.html',
  styleUrl: './listar-cliente.component.css'
})
export class ListarClienteComponent {
  listaRegistros: ClienteModel[] = [];
  pag: number = 1;
  total: number = 0;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;

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

}
