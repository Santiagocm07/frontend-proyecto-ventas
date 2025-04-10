import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioModel } from '../../../modelos/usuario.model';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambio-clave',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cambio-clave.component.html',
  styleUrl: './cambio-clave.component.css'
})
export class CambioClaveComponent {
  fGroup: FormGroup = new FormGroup({});
  usuario: UsuarioModel | null = null;

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router
  ){}

  ngOnInit() {
    // Obtener datos del usuario logueado desde localStorage
    this.usuario = this.servicioSeguridad.obtenerDatosUsuarioLS();
    
    this.fGroup = this.fb.group({
      clave: ['', [Validators.required]],
      claveNueva: ['', [Validators.required, Validators.minLength(6)]],
      validarClave: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  cambiarClave() {
    if (this.fGroup.invalid) {
      alert("Por favor, llene todos los campos correctamente");
      return;
    }

    const { clave, claveNueva, validarClave } = this.fGroup.value;

    if (claveNueva !== validarClave) {
      alert("Las claves nuevas no coinciden");
      return;
    }

    if (this.usuario) {
      console.log('Usuario obtenido en la función cambiarClave:', this.usuario);
      this.servicioSeguridad.cambiarClave(clave, claveNueva, validarClave).subscribe({
        next: (response) => {
          alert("Clave cambiada exitosamente");
          this.router.navigate(['/seguridad/identificar-usuario']);
        },
        error: (err) => {
          alert("Error al cambiar la clave. Verifique sus datos");
        }
      });
    }

  }

  get obtenerFormGroup() {
    return this.fGroup.controls;
  }

}
