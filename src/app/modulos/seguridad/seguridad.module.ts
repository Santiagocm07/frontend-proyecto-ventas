import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { IdentificacionUsuarioComponent } from './identificacion-usuario/identificacion-usuario.component';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    
    // No es necesario declarar los componentes, solo importarlos
    IdentificacionUsuarioComponent,
    CambioClaveComponent,
    RecuperarClaveComponent,
    CerrarSesionComponent
  ]
})
export class SeguridadModule { }
