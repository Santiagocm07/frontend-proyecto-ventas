import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductoModel } from '../../../../modelos/producto.model';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { ProductoService } from '../../../../servicios/parametros/producto.service';
import { ContadorCantidadComponent } from '../../../../compartidos/contador-cantidad/contador-cantidad.component';

@Component({
  selector: 'app-detalles-producto',
  imports: [CommonModule, RouterModule, ContadorCantidadComponent],
  templateUrl: './detalles-producto.component.html',
  styleUrl: './detalles-producto.component.css'
})
export class DetallesProductoComponent {
  producto: ProductoModel = {
    id: 0,
    nombre: '',
    precioVenta: 0,
    cantidadDisponible: 0,
    foto: ''
  };
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) {}

  cantidadAComprar = signal(1);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : 0;
    if (id > 0) {
      this.cargarProducto(id);
    } else {
      alert('Id de producto inválido');
    }
  }

  cargarProducto(id: number): void {
    this.productoService.buscarRegistro(id).subscribe({
      next: (data) => {
        this.producto = data;
      },
      error: (err) => {
        alert('No se pudo cargar el producto');
      }
    });
  }

}
