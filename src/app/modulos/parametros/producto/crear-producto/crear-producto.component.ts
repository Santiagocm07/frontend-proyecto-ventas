import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { Router, RouterModule } from '@angular/router';
import { ProductoModel } from '../../../../modelos/producto.model';
import { ArchivoModel } from '../../../../modelos/archivo.model';
import { ProductoService } from '../../../../servicios/parametros/producto.service';

@Component({
  selector: 'app-crear-producto',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent {
  nombreArchivoCargado: string = '';
  fGroup: FormGroup = new FormGroup({});
  cargarArchivoFG: FormGroup = new FormGroup({});
  archivoCargado: Boolean = false;
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private fb: FormBuilder,
    private servicio: ProductoService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.construirFormularioDatos();
    this.construirFormularioArchivo();
  }

  construirFormularioDatos(){
    this.fGroup = this.fb.group({
      nombre: ['', [Validators.required]],
      precioVenta: ['', [Validators.required]],
      cantidadDisponible: ['', [Validators.required]],
      foto: ['', [Validators.required]]
    });
  }

  guardarRegistro(){
    if (this.fGroup.invalid) {
      alert("Debe diligenciar todo el formulario, incluyendo la carga del archivo");
    } else {
      let model = this.obtenerRegistro();
      this.servicio.agregarRegistro(model).subscribe({
        next: (data: ProductoModel) => {
          alert("Información almacenada correctamente");
          this.router.navigate(['/parametros/producto-listar']);
        },
        error: (err: any) => {
          alert("Ha ocurrido un error");
        }
      })
    }
  }

  obtenerRegistro(): ProductoModel{
    let model = new ProductoModel();
    model.nombre = this.obtenerFgDatos["nombre"].value;
    model.cantidadDisponible = this.obtenerFgDatos["cantidadDisponible"].value;
    model.precioVenta = this.obtenerFgDatos["precioVenta"].value;
    model.foto = this.obtenerFgDatos["foto"].value;
    return model;
  }

  get obtenerFgDatos(){
    return this.fGroup.controls;
  }

  // Carga de archivo
  construirFormularioArchivo(){
    this.cargarArchivoFG = this.fb.group({
      archivo: ['', []]
    });
  }

  get obtenerFgArchivo(){
    return this.cargarArchivoFG.controls;
  }

  cargarArchivo(){
    const formData = new FormData();
    formData.append('file', this.cargarArchivoFG.controls["archivo"].value);
    this.servicio.cargarArchivo(formData).subscribe({
      next: (data: ArchivoModel) => {
        this.nombreArchivoCargado = data.file;
        this.obtenerFgDatos["foto"].setValue(this.nombreArchivoCargado);
        this.archivoCargado = true;
        alert("Archivo cargado correctamente");
      },
      error: (err: any) => {
        alert("Error cargando el archivo");
      }
    });
  }

  cuandoSeleccionaArchivo(event: any){
    if (event.target.files.length > 0) {
      const f = event.target.files[0];
      this.obtenerFgArchivo["archivo"].setValue(f);
    }
  }
}
