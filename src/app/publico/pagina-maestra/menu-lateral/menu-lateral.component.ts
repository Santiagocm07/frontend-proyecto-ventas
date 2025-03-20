import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { ItemMenuModel } from '../../../modelos/item.menu.model';

declare const iniciarMenuLateral: any;

@Component({
  selector: 'app-menu-lateral',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {

  listaMenu: ItemMenuModel[] = [];
  constructor(
    private servicioSeguridad: SeguridadService
  ){}

  ngOnInit(){
    this.listaMenu = this.servicioSeguridad.obtenerItemsMenuLateral();
    iniciarMenuLateral();
  }

}
