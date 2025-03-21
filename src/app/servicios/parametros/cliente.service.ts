import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { Observable } from 'rxjs';
import { PaginadorClienteModel } from '../../modelos/paginador.cliente.model';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  urlBase: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(private http: HttpClient) { }

  listarRegistros(pag: number): Observable<PaginadorClienteModel> {
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    return this.http.get<PaginadorClienteModel>(`${this.urlBase}cliente?filter={"limit":${limit}, "skip":${skip}}`);
  }
}
