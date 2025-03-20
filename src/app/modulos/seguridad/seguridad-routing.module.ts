import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificacionUsuarioComponent } from './identificacion-usuario/identificacion-usuario.component';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { IdentificacionSegundofaComponent } from './identificacion-segundofa/identificacion-segundofa.component';
import { RegistroPublicoUsuariosComponent } from './registro-publico-usuarios/registro-publico-usuarios.component';
import { ValidarHashUsuarioPublicoComponent } from './validar-hash-usuario-publico/validar-hash-usuario-publico.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './usuario/eliminar-usuario/eliminar-usuario.component';
import { validarSesionInactivaGuard } from '../../guardianes/validar-sesion-inactiva.guard';
import { validarSesionActivaGuard } from '../../guardianes/validar-sesion-activa.guard';

const routes: Routes = [
  {
    path: "identificar-usuario",
    component: IdentificacionUsuarioComponent,
    canActivate: [validarSesionInactivaGuard]
  },
  {
    path: "cambiar-clave",
    component: CambioClaveComponent,
    canActivate: [validarSesionActivaGuard]
  },
  {
    path: "recuperar-clave",
    component: RecuperarClaveComponent,
    canActivate: [validarSesionInactivaGuard]
  },
  {
    path: "cerrar-sesion",
    component: CerrarSesionComponent,
    canActivate: [validarSesionActivaGuard]
  },
  {
    path: "2fa",
    component: IdentificacionSegundofaComponent,
    canActivate: [validarSesionInactivaGuard]
  },
  {
    path: "registro-publico",
    component: RegistroPublicoUsuariosComponent
  },
  {
    path: "validar-hash-usuario-publico/:hash",
    component: ValidarHashUsuarioPublicoComponent
  },
  {
    path: "usuario-crear",
    component: CrearUsuarioComponent,
    canActivate: [validarSesionActivaGuard]
  },
  {
    path: "usuario-listar",
    component: ListarUsuarioComponent,
    canActivate: [validarSesionActivaGuard]
  },
  {
    path: "usuario-editar/:id",
    component: EditarUsuarioComponent,
    canActivate: [validarSesionActivaGuard]
  },
  {
    path: "usuario-eliminar",
    component: EliminarUsuarioComponent,
    canActivate: [validarSesionActivaGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
