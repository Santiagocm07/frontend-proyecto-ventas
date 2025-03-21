import { Component } from '@angular/core';
import { PaginadorClienteModel } from '../../../../modelos/paginador.cliente.model';
import { ClienteService } from '../../../../servicios/parametros/cliente.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-cliente',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './listar-cliente.component.html',
  styleUrl: './listar-cliente.component.css'
})
export class ListarClienteComponent {
  listaRegistros: PaginadorClienteModel = new PaginadorClienteModel();
  pag = 1;

  constructor(
    private servicio: ClienteService
  ){}

  ngOnInit(){
    this.servicio.listarRegistros(this.pag).subscribe({
      next: (datos) => {
        this.listaRegistros = datos;
      },
      error: (err) => {
        alert("Error leyendo los clientes")
      }
    });
  }

}
