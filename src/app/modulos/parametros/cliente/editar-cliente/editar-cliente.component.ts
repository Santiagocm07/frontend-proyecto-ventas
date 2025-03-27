import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../../../servicios/parametros/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteModel } from '../../../../modelos/cliente.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-cliente',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css'
})
export class EditarClienteComponent {
  fGroup: FormGroup = new FormGroup({});
  recordId: number = 0;

  constructor(
    private fb: FormBuilder,
    private servicio: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.recordId = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.buscarCliente();
  }

  construirFormulario(){
    this.fGroup = this.fb.group({
      id: ['', [Validators.required]],
      primerNombre: ['', [Validators.required]],
      segundoNombre: ['', []],
      primerApellido: ['', [Validators.required]],
      segundoApellido: ['', []],
      correo: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    })
  }

  buscarCliente(){
    this.servicio.buscarCliente(this.recordId).subscribe({
      next: (datos: ClienteModel) => {
        this.obtenerFgDatos["id"].setValue(datos.id);
        this.obtenerFgDatos["primerNombre"].setValue(datos.primerNombre);
        this.obtenerFgDatos["segundoNombre"].setValue(datos.segundoNombre);
        this.obtenerFgDatos["primerApellido"].setValue(datos.primerApellido);
        this.obtenerFgDatos["segundoApellido"].setValue(datos.segundoApellido);
        this.obtenerFgDatos["correo"].setValue(datos.correo);
        this.obtenerFgDatos["celular"].setValue(datos.celular);
        this.obtenerFgDatos["direccion"].setValue(datos.direccion);
      },
      error: (err) => {
        alert("El registro no existe");
      }
    })
  }

  editarCliente(){
    if (this.fGroup.invalid) {
      alert("Debe diligenciar todo el formulario");
    } else {
      let model = this.fGroup.value;
      this.servicio.editarCliente(model).subscribe({
        next: () => {
          alert("Cliente editado correctamente");
          this.router.navigate(['/parametros/cliente-listar']);
        },
        error: () => {
          alert("Error al editar el cliente");
        }
      });
    }
  }

  obtenerCliente(): ClienteModel {
    let model = new ClienteModel();
    model.id = parseInt(this.obtenerFgDatos["id"].value);
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
