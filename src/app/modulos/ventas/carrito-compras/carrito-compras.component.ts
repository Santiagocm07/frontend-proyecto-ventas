import { Component } from '@angular/core';
import { CarritoService } from '../../../servicios/compras/carrito.service';
import { CommonModule } from '@angular/common';
import { ProductoCarrito } from '../../../interfaces/carrito';
import { ContadorCantidadComponent } from '../../../compartidos/contador-cantidad/contador-cantidad.component';
import { ProductoService } from '../../../servicios/parametros/producto.service';
import { ProductoModel } from '../../../modelos/producto.model';
import { ConfiguracionRutasBackend } from '../../../config/configuracion.rutas.backend';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-carrito-compras',
  imports: [CommonModule, ContadorCantidadComponent, RouterModule],
  templateUrl: './carrito-compras.component.html',
  styleUrl: './carrito-compras.component.css'
})
export class CarritoComprasComponent {
  productosEnCarrito: ProductoCarrito[] = [];
  detallesProductos: Map<number, ProductoModel> = new Map();
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;
  constructor(
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private router: Router
  ){}

  // ngOnInit() {
  //   this.carritoService.carrito.subscribe((productos) => {
  //     this.productosEnCarrito = productos;
  //   });
  // }

  ngOnInit() {
    this.carritoService.carrito.subscribe((productosCarrito: ProductoCarrito[]) => {
      this.productosEnCarrito = productosCarrito;

      productosCarrito.forEach((item) => {
        if (!this.detallesProductos.has(item.idProducto)) {
          this.productoService.buscarRegistro(item.idProducto).subscribe({
            next: (producto: ProductoModel) => {
              this.detallesProductos.set(item.idProducto, producto);
            },
            error: (err) => {
              console.error(`Error al cargar el producto ${item.idProducto}`, err);
            }
          });
        }
      });
    });
  }

  getProducto(idProducto: number): ProductoModel | undefined {
    return this.detallesProductos.get(idProducto);
  }

  eliminarProducto(idProducto: number) {
    this.carritoService.eliminarProdCarrito(idProducto);
  }

  vaciarCarrito() {
    this.carritoService.limpiarCarrito()
  }

  actualizarCantidad(idProducto: number, nuevaCantidad: number) {
    const producto = this.getProducto(idProducto); 
    if(producto && producto.cantidadDisponible !== undefined) {
      if(nuevaCantidad > producto.cantidadDisponible) {
        alert (`Lo sentimos, solo hay ${producto.cantidadDisponible} unidades disponibles`);
        return;
      }
    }
    this.carritoService.cambiarCantidadProd(idProducto, nuevaCantidad);
  }

  get totalCarrito(): number {
    let total = 0;
    this.productosEnCarrito.forEach(p => {
      const detalle = this.getProducto(p.idProducto);
      if (detalle) {
        total += (detalle.precioVenta || 0) * p.cantidad;
      }
    });
    return total;
  }

}
