import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MedidoresService } from 'src/app/service/medidores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medidores',
  templateUrl: './medidores.component.html',
  styleUrls: ['./medidores.component.css']
})
export class MedidoresComponent implements OnInit {
constructor(private router: Router, private medidorService: MedidoresService, private fb: FormBuilder) {}
 nombre!: string;
 detalle!: string;
 identificador!: string;
 medidores: any[] = [];
 medidoresForm!: FormGroup;
 loginError: string = '';

 ngOnInit(): void{
  this.medidoresForm = this.initForm()
  this.getMedidores()

 }
 getMedidores(){
  this.medidorService.getMedidores().subscribe((data: any) => {
    this.medidores = data
  })
 }
   //Validaciones para los campos
 saveMedidor(){
  const nombre = this.medidoresForm.value.nombre;
  const detalle = this.medidoresForm.value.detalle;
  const identificador = this.medidoresForm.get('identificador')?.value;
  let userId = Number(localStorage.getItem('userId')!);
  console.log(nombre, detalle, identificador, userId);
  if(this.medidoresForm.valid){
  this.medidorService.addMedidor(nombre, detalle, identificador, userId).subscribe((medidor: any) => {
    console.log('Alerta agregada con éxito:', medidor);
    this.closeModal();
    this.getMedidores()
  }, (error: any) => {
    console.error('Hubo un error al agregar la alerta', error);
  })
  }else{
    this.medidoresForm.markAllAsTouched();
    this.loginError = 'Complete los campos';
  }
 }
 removeAlert(id:number){  

  Swal.fire({
    title: "Estás seguro de eliminar el medidor?",
    text: "No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar!"
  }).then((result) => {
    if (result.isConfirmed) {

      this.medidorService.removeMedidor(id).subscribe((medidor) => {
        console.log('Medidor eliminado con éxito:', medidor);
        this.closeModal();
        this.getMedidores()
      }, (error: any) => {
        console.error('Hubo un error al eliminar el medidor', error);
      })

      Swal.fire({
        title: "Eliminado!",
        text: "El medidor ha sido eliminado con éxito",
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
      this.medidoresForm.reset();
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
      identificador: [''],
    })
  }

  handleEnterKey(event: Event): void {
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
      const targetElement = event.target as HTMLElement;
      if (targetElement.tagName === 'A' && targetElement.classList.contains('nav-link')) {
        const linkText = targetElement.textContent?.trim();
        console.log(`Se presionó Enter en el enlace: ${linkText}`);
      }
    }
  }


}
