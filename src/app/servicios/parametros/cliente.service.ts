import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { Observable } from 'rxjs';
import { PaginadorClienteModel } from '../../modelos/paginador.cliente.model';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { HttpClient } from '@angular/common/http';
import { SeguridadService } from '../seguridad.service';

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
}
