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

@NgModule({
  declarations: [
    //Aca deben declarar los componentes de pages que crearon
    Pagina404Component,
    AlertasComponent,
    LoginComponent,
    DashboardClienteComponent,
    HistorialComponent,
    RegistroComponent,
    MiCuentaComponent
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
    LoginComponent,
    DashboardClienteComponent,
    HistorialComponent,
    MiCuentaComponent
  ]
})
export class PagesModule { }