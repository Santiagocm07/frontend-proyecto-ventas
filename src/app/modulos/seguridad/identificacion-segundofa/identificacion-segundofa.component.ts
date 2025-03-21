import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioValidadoModel } from '../../../modelos/usuario.validado.model';

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
    private fb: FormBuilder,
    private router: Router
  ) {

  }

  ngOnInit(){
    let datos = this.servicioSeguridad.obtenerDatosUsuarioLS();
    if(datos != null) {
      this.usuarioId = datos._id!;
      this.construirFormulario();
    } else {
      this.router.navigate(['/seguridad/identificar-usuario']);
    }
  }

  construirFormulario(){
    this.fGroup = this.fb.group({
      codigo: ['', [Validators.required]]
    });
  }

  // Validación del 2FA
  validarCodigo2fa(){
    if(this.fGroup.invalid) {
      alert("Debe ingresar el código");
    } else {
      let codigo2fa = this.obtenerFormGroup["codigo"].value;
      this.servicioSeguridad.validarCodigo2FA(this.usuarioId, codigo2fa).subscribe({
        next: (datos:UsuarioValidadoModel) => {
          console.log(datos);
          if (datos.token != null && datos.token != undefined && datos.token != "") {
            this.servicioSeguridad.construirMenuLateral(datos.menu);
            this.servicioSeguridad.almacenarDatosUsuarioValidado(datos);
            this.router.navigate([""]);
          } else {
            alert("El código no es válido, por favor revisa tu correo electrónico");
          }
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
