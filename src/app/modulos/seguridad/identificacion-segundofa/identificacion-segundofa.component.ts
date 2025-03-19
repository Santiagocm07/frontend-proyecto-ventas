import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-identificacion-segundofa',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './identificacion-segundofa.component.html',
  styleUrl: './identificacion-segundofa.component.css'
})
export class IdentificacionSegundofaComponent {

  usuarioId: string = "";
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private servicioSeguridad: SeguridadService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(){
    let datos = this.servicioSeguridad.obtenerDatosUsuarioLS();
    if(datos != null) {
      this.usuarioId = datos._id!;
      this.construirFormulario();
    }
  }

  construirFormulario(){
    this.fGroup = this.fb.group({
      codigo: ['', [Validators.required]]
    });
  }

  validarCodigo2fa(){
    if(this.fGroup.invalid) {
      alert("Debe ingresar el código");
    } else {
      let codigo2fa = this.obtenerFormGroup["codigo"].value;
      this.servicioSeguridad.validarCodigo2FA(this.usuarioId, codigo2fa).subscribe({
        next: (datos:object) => {
          console.log(datos);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  get obtenerFormGroup(){
    return this.fGroup.controls;
  }
}
