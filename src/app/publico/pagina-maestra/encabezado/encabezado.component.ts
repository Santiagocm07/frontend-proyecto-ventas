import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioValidadoModel } from '../../../modelos/usuario.validado.model';

@Component({
  selector: 'app-encabezado',
  imports: [CommonModule, ReactiveFormsModule, MenuLateralComponent],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css'
})
export class EncabezadoComponent {

  constructor(
    private servicioSeguridad: SeguridadService
  ){}

  sesionActiva: boolean = false;

  ngOnInit() {
    this.validarSesion();
  }

  validarSesion(){
    this.servicioSeguridad.obtenerDatosSesion().subscribe({
      next: (datos: UsuarioValidadoModel) => {
        if(datos.token != ""){
          this.sesionActiva = true;
        } else {
          this.sesionActiva = false;
        }
      },
      error:(err: any) => {

      }
    });
  }
}
