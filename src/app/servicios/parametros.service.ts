import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { Observable } from 'rxjs';
import { ProductoModel } from '../modelos/producto.model';
import { ConfiguracionPaginacion } from '../config/configuracion.paginacion';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  urlBase: string = ConfiguracionRutasBackend.urlNegocio;
  constructor(private http: HttpClient) { }

  /**
   * Listado de productos
   * @returns 
   */
  listarRegistro(): Observable<ProductoModel[]> {
    return this.http.get<ProductoModel[]>(`${this.urlBase}producto?filter={"limit":${ConfiguracionPaginacion.registroPorPagina}}`);
  }
}
