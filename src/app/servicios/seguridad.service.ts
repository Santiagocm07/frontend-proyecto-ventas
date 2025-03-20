import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioModel } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { UsuarioValidadoModel } from '../modelos/usuario.validado.model';
import { PermisoModel } from '../modelos/permiso.model';
import { ItemMenuModel } from '../modelos/item.menu.model';
import { ConfiguracionMenuLateral } from '../config/configuracion.menu.lateral';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  urlBase: string = ConfiguracionRutasBackend.urlSeguridad;

  constructor(private http: HttpClient) { 
    this.validacionDeSesion();
  }

  /**
   * Identificar usuario
   * @param usuario 
   * @param clave 
   * @returns datos del usuario validado
   */
  identificarUsuario(usuario: string, clave: string): Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>(`${this.urlBase}identificar-usuario`, {
      correo: usuario,
      clave: clave
    });
  }

  /**
   * Almacena los datos del usuario
   * @param datos datos del usuario
   */
  almacenarDatosUsuarioIdentificado(datos: UsuarioModel): boolean{
    let cadena = JSON.stringify(datos);
    let datosLS = localStorage.getItem("datos-usuario");
    if(datosLS){
      return false;
    } else{
      localStorage.setItem("datos-usuario", cadena);
      return true;
    }
  }

  // Cerrando sesión
  removerDatosUsuarioValidado(){
    let datosUsuario = localStorage.getItem("datos-usuario");
    let datosSesion = localStorage.getItem("datos-sesion");
    if(datosUsuario){
      localStorage.removeItem("datos-usuario");
    }
    if(datosSesion){
      localStorage.removeItem("datos-sesion");
    }
    localStorage.removeItem("menu-lateral");
    this.actualizarComportamientoUsuario(new UsuarioValidadoModel());
  }

  /**
   * Busca los datos en localStorage de un usuario
   * @returns 
   */
  obtenerDatosUsuarioLS(): UsuarioModel | null{
    let datosLS = localStorage.getItem("datos-usuario");
    if(datosLS){
      let datos = JSON.parse(datosLS);
      return datos;
    } else{
      return null;
    }
  }

  /**
   * Validar 2FA
   * @param idUsuario
   * @param codigo 
   * @returns 
   */
  validarCodigo2FA(idUsuario: string, codigo: string): Observable<UsuarioValidadoModel>{
    return this.http.post<UsuarioValidadoModel>(`${this.urlBase}verificar-2fa`, {
      usuarioId: idUsuario,
      codigo2fa: codigo
    });
  }

  registrarUsuarioPublico(datos: any): Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>(`${this.urlBase}usuario-publico`, datos);
  }

  validarHashUsuarioPublico(hash: string): Observable<boolean>{
    return this.http.post<boolean>(`${this.urlBase}validar-hash-usuario`,{
      codigoHash: hash
    });
  }

  /**
   * Guardar en localStorage la información del usuario validado
   * @param datos datos del usuario validado
   * @returns respuesta
   */
  almacenarDatosUsuarioValidado(datos: UsuarioValidadoModel): boolean {
    let datosLS = localStorage.getItem("datos-sesion");
    if (datosLS != null) {
      return false;
    } else {
      let datosString = JSON.stringify(datos);
      localStorage.setItem("datos-sesion", datosString);
      this.actualizarComportamientoUsuario(datos);
      return true;
    }
  }

  recuperarClavePorUsuario(usuario: string): Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>(`${this.urlBase}recuperar-clave`, {
      correo: usuario,
    });
  }

  // Administración de la sesión de usuario
  datosUsuarioValidado = new BehaviorSubject<UsuarioValidadoModel>(new UsuarioValidadoModel());

  obtenerDatosSesion(): Observable<UsuarioValidadoModel>{
    return this.datosUsuarioValidado.asObservable();
  }
  
  validacionDeSesion() {
    let ls = localStorage.getItem("datos-sesion");
    if (ls){
      let objUsuario = JSON.parse(ls);
      this.actualizarComportamientoUsuario(objUsuario);
    }
  }

  actualizarComportamientoUsuario(datos: UsuarioValidadoModel) {
    return this.datosUsuarioValidado.next(datos);
  }

  construirMenuLateral(permisos: PermisoModel[]) {
    let menu: ItemMenuModel[] = [];
    permisos.forEach((permiso) => {
      let datosRuta = ConfiguracionMenuLateral.listaMenu.filter(x => x.id == permiso.menuId);
      if (datosRuta.length > 0){
        let item = new ItemMenuModel();
        item.idMenu = permiso.menuId;
        item.ruta = datosRuta[0].ruta;
        item.icono = datosRuta[0].icono;
        item.texto = datosRuta[0].texto;
        menu.push(item);
      }
    });
    this.almacenarItemsMenuLateral(menu);
  }

  /**
   * 
   * @param itemsMenu items del menú a guardar en Local Storage
   */
  almacenarItemsMenuLateral(itemsMenu: ItemMenuModel[]) {
    let menuStr = JSON.stringify(itemsMenu);
    localStorage.setItem("menu-lateral", menuStr);
  }

  /**
   * 
   * @returns lista con items del menú
   */
  obtenerItemsMenuLateral(): ItemMenuModel[] {
    let menu: ItemMenuModel[] = [];
    let menuStr = localStorage.getItem("menu-lateral");
    if (menuStr) {
      menu = JSON.parse(menuStr);
    }
    return menu;
  }
}
