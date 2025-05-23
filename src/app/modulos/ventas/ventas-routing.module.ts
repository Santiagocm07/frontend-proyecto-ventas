import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComprasComponent } from './carrito-compras/carrito-compras.component';

const routes: Routes = [
  {
    path: "carrito-compras",
    component: CarritoComprasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
