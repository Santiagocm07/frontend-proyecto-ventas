import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-identificacion-usuario',
  standalone: true, // Indica que este es un componente standalone
  imports: [CommonModule, ReactiveFormsModule], // Importar ReactiveFormsModule
  templateUrl: './identificacion-usuario.component.html',
  styleUrl: './identificacion-usuario.component.css'
})
export class IdentificacionUsuarioComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
  ) {
  }

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
      alert("Identificando...");
    }
  }

  get obtenerFormGroup() {
    return this.fGroup.controls;
  }
}
