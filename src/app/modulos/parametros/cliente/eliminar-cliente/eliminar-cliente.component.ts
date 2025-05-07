import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { ClienteService } from '../../../../servicios/parametros/cliente.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClienteModel } from '../../../../modelos/cliente.model';

@Component({
  selector: 'app-eliminar-cliente',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './eliminar-cliente.component.html',
  styleUrl: './eliminar-cliente.component.css'
})
export class EliminarClienteComponent {
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;
  recordId: number = 0;
  primerNombre: string = "";
  segundoNombre: string = "";
  primerApellido: string = "";
  segundoApellido: string = "";
  correo: string = "";
  celular: string = "";
  direccion: string = "";

  constructor(
    private servicio: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.recordId = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.buscarRegistro();
  }

  buscarRegistro(){
    this.servicio.buscarCliente(this.recordId).subscribe({
      next: (datos: ClienteModel) => {
        this.recordId = datos.id!;
        this.primerNombre = datos.primerNombre!;
        this.segundoNombre = datos.segundoNombre!;
        this.primerApellido = datos.primerApellido!;
        this.segundoApellido = datos.segundoApellido!;
        this.correo = datos.correo!;
        this.celular = datos.celular!;
        this.direccion = datos.direccion!;
      },
      error: (err) => {
        alert("El cliente no existe");
      }
    });
  }

  eliminarRegistro(){
    this.servicio.eliminarCliente(this.recordId).subscribe({
      next: (data: any) => {
        alert("Cliente eliminado correctamente");
        this.router.navigate(['/parametros/cliente-listar']);
      },
      error: (err: any) => {
        alert("Ha ocurrido un error al eliminar el cliente");
      }
    });
  }

}
