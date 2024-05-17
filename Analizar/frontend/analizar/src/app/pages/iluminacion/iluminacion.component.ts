import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators, FormControl  } from '@angular/forms';
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
   saveIluminacion() {
    const nombre = this.iluminacionForm.get('nombre')?.value;
    const detalle = this.iluminacionForm.get('detalle')?.value;
    const intensidad = parseInt(this.iluminacionForm.get('intensidad')?.value);
    const encendido = this.iluminacionForm.get('encendido')?.value; 
    const identificador = this.iluminacionForm.get('identificador')?.value || '';
    let userId = Number(localStorage.getItem('userId')!);
    console.log(nombre, detalle, identificador, intensidad, encendido, userId);
  
    if (this.iluminacionForm.valid) {
      this.iluminacionService.addIluminacion(nombre, detalle, identificador, userId, intensidad, encendido)
        .subscribe((iluminacion: any) => {
          console.log('Iluminacion agregada con éxito:', iluminacion);
          this.closeModal();
          this.getIluminacion();
        }, (error: any) => {
          console.error('Hubo un error al agregar la iluminacion', error);
        });
    } else {
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

  openEditModal(iluminacion: any): void{
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
      nombre: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      intensidad: ['100', [Validators.required]],
      encendido: [true, [Validators.required]],
      identificador: [''],
    })
  }

}
