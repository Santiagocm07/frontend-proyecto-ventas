import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { Observable } from 'rxjs';
import { PaginadorClienteModel } from '../../modelos/paginador.cliente.model';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SeguridadService } from '../seguridad.service';
import { ClienteModel } from '../../modelos/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  token = "";
  urlBase: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private http: HttpClient,
    private servicioSeguridad: SeguridadService
  ) { 
    this.token = this.servicioSeguridad.obtenerTokenLocalStorage();
  }

  listarClienteConFiltro(limit: number | null): Observable<ClienteModel[]> {
    const url = limit? `${this.urlBase}cliente?filter={"limit": ${limit}}`: `${this.urlBase}cliente`;
    return this.http.get<ClienteModel[]>(url, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  listarRegistros(pag: number): Observable<PaginadorClienteModel> {
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    let url = `${this.urlBase}cliente?filter={"limit":${limit}, "skip":${skip}}`;
    return this.http.get<PaginadorClienteModel>(url, {
      headers: {
        "Authorization": `Bearer ${this.token}`
      }
    });
  }

  buscarCliente(id: number): Observable<ClienteModel> {
    return this.http.get<ClienteModel>(`${this.urlBase}cliente/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  agregarCliente(cliente: ClienteModel): Observable<ClienteModel> {
    return this.http.post(`${this.urlBase}cliente`, cliente, {
      headers: new HttpHeaders ({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  editarCliente(cliente: ClienteModel): Observable<ClienteModel> {
    return this.http.put(`${this.urlBase}cliente/${cliente.id}`, cliente, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  eliminarCliente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}cliente/${id}`, {
      headers: new HttpHeaders ({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
}
