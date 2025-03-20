import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SeguridadService } from '../servicios/seguridad.service';

export const validarSesionInactivaGuard: CanActivateFn = (route, state) => {
  const servicioSeguridad = inject(SeguridadService);
  const router = inject(Router);
  
  let existeSesion = servicioSeguridad.validacionDeSesion();
  if (existeSesion) {
    router.navigate(["/inicio"]);
    return false;
  }
  return true;
};
