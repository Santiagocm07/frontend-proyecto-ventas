import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { Observable } from 'rxjs';
import { ProductoModel } from '../../modelos/producto.model';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { PaginadorProductoModel } from '../../modelos/paginador.producto.model';
import { SeguridadService } from '../seguridad.service';
import { ArchivoModel } from '../../modelos/archivo.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  token = "";
  urlBase: string = ConfiguracionRutasBackend.urlNegocio;
  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) { 
    this.token = this.servicioSeguridad.obtenerTokenLocalStorage();
  }

  /**
   * Listado de productos
   * @returns 
   */
  listarRegistro(): Observable<ProductoModel[]> {
    return this.http.get<ProductoModel[]>(`${this.urlBase}producto?filter={"limit":${ConfiguracionPaginacion.registroPorPagina}}`);
  }

  listarRegistrosPaginados(pag: number): Observable<PaginadorProductoModel> {
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    let url = `${this.urlBase}producto-paginado?filter={"limit":${limit}, "skip":${skip}}`;
    return this.http.get<PaginadorProductoModel>(url, {
      headers: {
        "Authorization": `Bearer ${this.token}`
      }
    });
  }

  agregarRegistro(registro: ProductoModel): Observable<ProductoModel> {
    return this.http.post(`${this.urlBase}producto`, registro, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  cargarArchivo(formData: FormData): Observable<ArchivoModel> {
    return this.http.post<ArchivoModel>(`${this.urlBase}cargar-archivo-producto`, formData, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
}
