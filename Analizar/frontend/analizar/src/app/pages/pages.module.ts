import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { Pagina404Component } from './pagina404/pagina404.component';
import { AlertasComponent } from './alertas/alertas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardClienteComponent } from './dashboard-cliente/dashboard-cliente.component';
import { HistorialComponent } from './historial/historial.component';
import { RegistroComponent } from './registro/registro.component';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ProductosComponent } from './productos/productos.component';
import { PlanesComponent } from './planes/planes.component';
import { HomeComponent } from './home/home.component';
import { EditAlertaComponent } from './alertas/edit-alerta/edit-alerta.component';
import { MedidoresComponent } from './medidores/medidores.component';
import { EditProductoComponent } from './productos/edit-producto/edit-producto.component';
import { IluminacionComponent } from './iluminacion/iluminacion.component';
import { EditIluminacionComponent } from './iluminacion/edit-iluminacion/edit-iluminacion.component';

@NgModule({
  declarations: [
    //Aca deben declarar los componentes de pages que crearon
    Pagina404Component,
    AlertasComponent,
    LoginComponent,
    DashboardClienteComponent,
    HistorialComponent,
    RegistroComponent,
    MiCuentaComponent,
    DashboardAdminComponent,
    ProductosComponent,
    PlanesComponent,
    CarritoComponent,
    HomeComponent,
    EditAlertaComponent,
    MedidoresComponent,
    EditProductoComponent,
    IluminacionComponent,
    EditIluminacionComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  exports: [
    //Aca deben exportar los componentes de pages creados, para ser utilizados por otros modulos
    Pagina404Component,
    AlertasComponent,
    EditAlertaComponent,
    IluminacionComponent,
    EditIluminacionComponent,
    LoginComponent,
    DashboardClienteComponent,
    HistorialComponent,
    MiCuentaComponent,
    DashboardAdminComponent,
    ProductosComponent,
    PlanesComponent,
    CarritoComponent,
    HomeComponent,
    MedidoresComponent,
    EditProductoComponent
  ]
})
export class PagesModule { }
