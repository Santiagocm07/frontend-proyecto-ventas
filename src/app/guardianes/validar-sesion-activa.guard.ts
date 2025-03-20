import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SeguridadService } from '../servicios/seguridad.service';

export const validarSesionActivaGuard: CanActivateFn = (route, state) => {
  const servicioSeguridad = inject(SeguridadService);
  const router = inject(Router);
  let existeSesion = servicioSeguridad.validacionDeSesion();
  if (existeSesion) {
    return true;
  }
  router.navigate(["/inicio"]);
  return false;
};
