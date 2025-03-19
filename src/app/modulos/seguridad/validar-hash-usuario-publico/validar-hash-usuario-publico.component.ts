import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-validar-hash-usuario-publico',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './validar-hash-usuario-publico.component.html',
  styleUrl: './validar-hash-usuario-publico.component.css'
})
export class ValidarHashUsuarioPublicoComponent {
  validado = false;
  hash: string = "";

  constructor(
    private servicioSeguridad: SeguridadService,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.hash = this.route.snapshot.params["hash"];
    this.validarHash();
  }

  // Método de validación de hash
  validarHash(){
    this.servicioSeguridad.validarHashUsuarioPublico(this.hash).subscribe({
      next: (respuesta: boolean) => {
        this.validado = respuesta;
      },
      error: (err) => {

      }
    });
  }
}
