import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IluminacionService } from 'src/app/service/iluminacion.service';

@Component({
  selector: 'app-iluminacion',
  templateUrl: './iluminacion.component.html',
  styleUrls: ['./iluminacion.component.css']
})
export class IluminacionComponent implements OnInit {
constructor(private router: Router, private iluminacionService: IluminacionService, private fb: FormBuilder) {}
 nombre!: string;
 detalle!: string;
 identificador!: string;
 intensidad!: number;
 encendido!: boolean;
 iluminacion: any[] = [];
 iluminacionForm!: FormGroup;
 loginError: string = '';
 
 ngOnInit(): void{
  this.iluminacionForm = this.initForm()
  this.getIluminacion()
  
 }
 getIluminacion(){
  this.iluminacionService.getIluminacion().subscribe((data: any) => {
    this.iluminacion = data   
  })
 }
   //Validaciones para los campos
 saveIluminacion(){
  const nombre = this.iluminacionForm.value.nombre; 
  const detalle = this.iluminacionForm.value.detalle;
  const intensidad = this.iluminacionForm.value.intensidad;
  const encendido = this.iluminacionForm.value.encendido;
  const identificador = this.iluminacionForm.get('identificador')?.value; 
  let userId = Number(localStorage.getItem('userId')!);
  console.log(nombre, detalle, identificador, intensidad, encendido, userId);
  if(this.iluminacionForm.valid){
  this.iluminacionService.addIluminacion(nombre, detalle, identificador, userId, intensidad, encendido).subscribe((iluminacion: any) => {
    console.log('Iluminacion agregada con éxito:', iluminacion);
    this.closeModal();
    this.getIluminacion()
  }, (error: any) => {
    console.error('Hubo un error al agregar la iluminacion', error);
  })
  }else{
    this.iluminacionForm.markAllAsTouched();
    this.loginError = 'Complete los campos';
  }
 }
 removeIluminacion(id:number){  
  this.iluminacionService.removeIluminacion(id).subscribe((iluminacion) => {
    console.log('Iluminacion eliminada con éxito:', iluminacion);
    this.closeModal();
    this.getIluminacion()
  }, (error: any) => {
    console.error('Hubo un error al eliminar la Iluminacion', error);
  })

 }

  //Abrir modal
  openModal(): void{
    const modal = document.getElementById('addAlert');
    let contenedorAlertas = document.getElementById('contenedor-alertas');
    if(modal != null) {
      modal.style.display ='flex'; 
      this.iluminacionForm.reset();     
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
      nombre: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      intensidad: ['', [Validators.required]],
      encendido: ['', [Validators.required]],
      identificador: [''],
    })
  }

}
