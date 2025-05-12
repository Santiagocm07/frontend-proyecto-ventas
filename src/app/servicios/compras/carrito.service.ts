import { Injectable } from '@angular/core';
import { ProductoModel } from '../../modelos/producto.model';
import { BehaviorSubject } from 'rxjs';
import { ProductoCarrito } from '../../interfaces/carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private readonly STORAGE_KEY = 'carrito';
  private carritoSubject = new BehaviorSubject<ProductoCarrito[]>(this.cargarCarritoLocalStorage());
  carrito = this.carritoSubject.asObservable();

  constructor() { }

  private obtenerCarrito(): ProductoCarrito[] {
    return this.carritoSubject.value;
  }

  private guardarCarritoLocalStorage(carrito: ProductoCarrito[]):void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(carrito));
  }

  private cargarCarritoLocalStorage(): ProductoCarrito[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  agregarProdCarrito(idProducto: number, cantidad: number) {
    const carrito = this.obtenerCarrito();
    const i = carrito.findIndex(producto => producto.idProducto === idProducto);
    if (i === -1) {
      const nuevoProducto = {idProducto:idProducto, cantidad:cantidad};
      carrito.push(nuevoProducto);
    } else {
      carrito[i].cantidad += cantidad;
    }

    this.carritoSubject.next(carrito);
    this.guardarCarritoLocalStorage(carrito);

  }

  eliminarProdCarrito(idProducto: number) {
    let carrito = this.obtenerCarrito();
    carrito = carrito.filter(producto => producto.idProducto !== idProducto);

    this.carritoSubject.next(carrito);
    this.guardarCarritoLocalStorage(carrito);

  }

  cambiarCantidadProd(idProducto: number, cantidad: number) {
    let carrito = this.obtenerCarrito();
    carrito = carrito.map(producto => {
      const productoActual = producto;
      if (productoActual.idProducto === idProducto) productoActual.cantidad = cantidad;
      return productoActual;
    });

    this.carritoSubject.next(carrito);
    this.guardarCarritoLocalStorage(carrito);
  }

  limpiarCarrito() {
    this.carritoSubject.next([]);
    this.guardarCarritoLocalStorage([]);
  }
}
