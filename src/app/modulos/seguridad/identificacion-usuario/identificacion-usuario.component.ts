import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioModel } from '../../../modelos/usuario.model';
import { MD5 } from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identificacion-usuario',
  standalone: true, // Indica que este es un componente standalone
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './identificacion-usuario.component.html',
  styleUrl: './identificacion-usuario.component.css'
})
export class IdentificacionUsuarioComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router
  ) {}

  ngOnInit(){
    this.construirFormulario();
  }

  construirFormulario() {
    this.fGroup = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]],
    });
  }

  identificarUsuario() {
    if (this.fGroup.invalid) {
      alert("Datos incompletos");
    } else {
      let usuario = this.obtenerFormGroup['usuario'].value;
      let clave = this.obtenerFormGroup['clave'].value;
      let claveCifrada = MD5(clave).toString();
      this.servicioSeguridad.identificarUsuario(usuario, claveCifrada).subscribe({
        next: (datos: UsuarioModel) => {
          console.log(datos);
          this.router.navigate(["/seguridad/2fa"]);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  get obtenerFormGroup() {
    return this.fGroup.controls;
  }
}

