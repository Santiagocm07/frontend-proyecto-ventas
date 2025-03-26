import { Component } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { ProductoService } from '../../../../servicios/parametros/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoModel } from '../../../../modelos/producto.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-eliminar-producto',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './eliminar-producto.component.html',
  styleUrl: './eliminar-producto.component.css'
})
export class EliminarProductoComponent {
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;
  recordId: number = 0;
  nombre: string = "";
  precioVenta: number = 0;
  cantidadDisponible: number = 0;
  foto: string = "";

  constructor(
    private servicio: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.recordId = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.buscarRegistro();
  }

  buscarRegistro(){
    this.servicio.buscarRegistro(this.recordId).subscribe({
      next: (datos: ProductoModel) => {
        this.recordId = datos.id!;
        this.nombre = datos.nombre!;
        this.precioVenta = datos.precioVenta!;
        this.cantidadDisponible = datos.cantidadDisponible!;
        this.foto = datos.foto!;
      },
      error: (err) => {
        alert("El registro no existe");
      }
    })
  }

  eliminarRegistro(){
      this.servicio.eliminarRegistro(this.recordId).subscribe({
        next: (data: any) => {
          alert("Información eliminada correctamente");
          this.router.navigate(['/parametros/producto-listar']);
        },
        error: (err: any) => {
          alert("Ha ocurrido un error al eliminar el producto");
        }
      });
  }

}
