import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { ProductoService } from '../../../../servicios/parametros/producto.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductoModel } from '../../../../modelos/producto.model';
import { ArchivoModel } from '../../../../modelos/archivo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-producto',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent {
  nombreArchivoCargado: string = '';
  fGroup: FormGroup = new FormGroup({});
  cargarArchivoFG: FormGroup = new FormGroup({});
  archivoCargado: Boolean = false;
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;
  recordId: number = 0;

  constructor(
    private fb: FormBuilder,
    private servicio: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.recordId = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.construirFormularioDatos();
    this.construirFormularioArchivo();
    this.buscarRegistro();
  }

  buscarRegistro(){
    this.servicio.buscarRegistro(this.recordId).subscribe({
      next: (datos: ProductoModel) => {
        this.obtenerFgDatos["id"].setValue(datos.id);
        this.obtenerFgDatos["nombre"].setValue(datos.nombre);
        this.obtenerFgDatos["precioVenta"].setValue(datos.precioVenta);
        this.obtenerFgDatos["cantidadDisponible"].setValue(datos.cantidadDisponible);
        this.obtenerFgDatos["foto"].setValue(datos.foto);
        this.nombreArchivoCargado = datos.foto!;
        this.archivoCargado = true;
      },
      error: (err) => {
        alert("El registro no existe");
      }
    })
  }
  
  construirFormularioDatos(){
    this.fGroup = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      precioVenta: ['', [Validators.required]],
      cantidadDisponible: ['', [Validators.required]],
      foto: ['', [Validators.required]]
    });
  }

  editarRegistro(){
    if (this.fGroup.invalid) {
      alert("Debe diligenciar todo el formulario, incluyendo la carga del archivo");
    } else {
      let model = this.obtenerRegistro();
      this.servicio.editarRegistro(model).subscribe({
        next: (data: ProductoModel) => {
          alert("Información modificada correctamente");
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
    model.id = parseInt(this.obtenerFgDatos["id"].value);
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
