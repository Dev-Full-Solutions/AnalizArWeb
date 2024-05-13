import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/service/alertas.service';
import { MedidoresService } from 'src/app/service/medidores.service';

import { Alert } from './Alert';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

constructor(private router: Router, private alertaService: AlertasService, private fb: FormBuilder, private medidorService: MedidoresService) {}
 alerts: Alert[] = [];
 valor!: number;
 medidor!: number;
 fechaAlta!: string;
 alertas: any[] = [];
 medidores: any[] = [];
 alertasForm!: FormGroup;
 loginError: string = '';
 
 ngOnInit(): void{
  this.alertasForm = this.initForm()
  this.getAlerts()
  this.getMedidoresByUser()
  
 }
 getAlerts(){
  this.alertaService.getAlertas().subscribe((data: any) => {
    this.alertas = data   
  })
 }
 //Traer medidores para poder seleccionar para que medidor hacer la alerta
 getMedidoresByUser(){
  this.medidorService.getMedidores().subscribe((data: any) => {
    this.medidores = data
    //console.log(data);
    
  })
 }
   //Validaciones para los campos
 saveAlert(){
  const valor = this.alertasForm.value.valor; 
  const medidor = this.alertasForm.value.medidor;
  const fechaAlta = this.alertasForm.get('fechaAlta')?.value; 
  if(this.alertasForm.valid){
  this.alertaService.addAlertas(valor, medidor, fechaAlta).subscribe((alert: any) => {
    //console.log('Alerta agregada con éxito:', alert);
    this.closeModal();
    this.getAlerts()
  }, (error: any) => {
    console.error('Hubo un error al agregar la alerta', error);
  })
  }else{
    this.alertasForm.markAllAsTouched();
    this.loginError = 'Complete los campos';
  }
  /*
  if(this.setAlert && this.typeAlert){
    let alert = new Alert();
    console.log(alert.setAlert);
    alert.setAlert = this.setAlert;
    alert.typeAlert = this.typeAlert;
    console.log(this.setAlert);
    console.log(this.typeAlert);  
    this.alerts.push(alert);
    this.setAlert = 0;
    this.typeAlert = '';
    this.closeModal();
  }else{
    alert("Ingrese una alerta");
  }*/

 }
 updateAlert(){
  //const id = this.
  //this.alertaService.updateAlertas(id)
 }

 removeAlert(id:number){  

  Swal.fire({
    title: "Estás seguro de eliminar la alerta?",
    text: "No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar!"
  }).then((result) => {
    if (result.isConfirmed) {

      this.alertaService.removeAlertas(id).subscribe((alert) => {
        //console.log('Alerta eliminada con éxito:', alert);
        this.closeModal();
        this.getAlerts()
      }, (error: any) => {
        console.error('Hubo un error al eliminar la alerta', error);
      })

      Swal.fire({
        title: "Eliminada!",
        text: "La alerta ha sido eliminada con éxito",
        icon: "success"
      });
    }
  });

  

 }

  //Abrir modal
  openModal(): void{
    const modal = document.getElementById('addAlert');
    let contenedorAlertas = document.getElementById('contenedor-alertas');
    if(modal != null) {
      modal.style.display ='flex'; 
      this.alertasForm.reset();     
    }
    if(contenedorAlertas != null) {
      contenedorAlertas.style.display ='none';
    }
  }
  //Abrir modal editar
  openEditModal(alerta: any): void{
    const editModal = document.getElementById('editAlert');
    let contenedorAlertas = document.getElementById('contenedor-alertas');
    if(editModal != null) {
      editModal.style.display ='flex';      
    }
    if(contenedorAlertas != null) {
      contenedorAlertas.style.display ='none';
    }
  }
  //Cerrar modal
  closeModal(){
    const modal = document.getElementById('addAlert');
    let contenedorAlertas = document.getElementById('contenedor-alertas');
    if(modal != null) {
      modal.style.display ='none';
    }
    if(contenedorAlertas != null) {
      contenedorAlertas.style.display ='grid';
    }
  }
  initForm(): FormGroup {
    return this.fb.group({
      valor: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      medidor: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      fechaAlta: [''],
    })
  }

}
