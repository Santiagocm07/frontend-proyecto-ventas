import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioModel } from '../../../modelos/usuario.model';

@Component({
  selector: 'app-registro-publico-usuarios',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-publico-usuarios.component.html',
  styleUrl: './registro-publico-usuarios.component.css'
})
export class RegistroPublicoUsuariosComponent {

  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService
  ){}

  ngOnInit(){
    this.contruirFormulario();
  }

  //Construcción del formulario con los controles
  contruirFormulario(){
    this.fGroup = this.fb.group({
      primerNombre: ['', [Validators.required, Validators.minLength(2)]],
      segundoNombre: ['', [Validators.minLength(2)]],
      primerApellido: ['', [Validators.required, Validators.minLength(2)]],
      segundoApellido: ['', [Validators.minLength(2)]],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.minLength(12)]],
    });
  }

  //Función de registro público
  registrarse(){
    let campos = this.obtenerFormGroup;
    let datos = {
      primerNombre: campos["primerNombre"].value,
      segundoNombre: campos["segundoNombre"].value,
      primerApellido: campos["primerApellido"].value,
      segundoApellido: campos["segundoApellido"].value,
      correo: campos["correo"].value,
      celular: campos["telefono"].value
    }
    this.servicioSeguridad.registrarUsuarioPublico(datos).subscribe({
      next: (respuesta: UsuarioModel) => {
        alert("Registro correcto, se ha enviado un mensaje para validar su dirección de correo electrónico");
      },
      error: (err) => {
        alert("Se ha producido un error en el registro");
      }
    });
  }

  get obtenerFormGroup() {
    return this.fGroup.controls;
  }
}
