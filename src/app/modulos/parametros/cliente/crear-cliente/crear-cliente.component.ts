import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { ClienteService } from '../../../../servicios/parametros/cliente.service';
import { Router, RouterModule } from '@angular/router';
import { ClienteModel } from '../../../../modelos/cliente.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-cliente',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.css'
})
export class CrearClienteComponent {
  fGroup: FormGroup = new FormGroup({});
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private fb: FormBuilder,
    private servicio: ClienteService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.construirFormularioDatos();
  }

  construirFormularioDatos(){
    this.fGroup = this.fb.group({
      primerNombre: ['', [Validators.required]],
      segundoNombre: ['', []],
      primerApellido: ['', [Validators.required]],
      segundoApellido: ['', []],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    })
  }

  guardarRegistro(){
    if (this.fGroup.invalid) {
      alert("Debe diligenciar correctamente el formulario");
    } else {
      let model = this.obtenerRegistro();
      this.servicio.agregarCliente(model).subscribe({
        next: (data: ClienteModel) => {
          alert("Cliente creado correctamente");
          this.router.navigate(['/parametros/cliente-listar']);
        },
        error: (err: any) => {
          alert("Ha ocurrido un error al crear el cliente");
        }
      })
    }
  }

  obtenerRegistro(): ClienteModel {
    let model = new ClienteModel();
    model.primerNombre = this.obtenerFgDatos["primerNombre"].value;
    model.segundoNombre = this.obtenerFgDatos["segundoNombre"].value || '';
    model.primerApellido = this.obtenerFgDatos["primerApellido"].value;
    model.segundoApellido = this.obtenerFgDatos["segundoApellido"].value || '';
    model.correo = this.obtenerFgDatos["correo"].value;
    model.celular = this.obtenerFgDatos["celular"].value;
    model.direccion = this.obtenerFgDatos["direccion"].value;

    return model;
  }

  get obtenerFgDatos(){
    return this.fGroup.controls;
  }

}
