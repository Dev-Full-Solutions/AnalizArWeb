import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IluminacionService } from 'src/app/service/iluminacion.service';



@Component({
  selector: 'app-edit-iluminacion',
  templateUrl: './edit-iluminacion.component.html',
  styleUrls: ['./edit-iluminacion.component.css']
})
export class EditIluminacionComponent implements OnInit {
  constructor(private rutaEdit: ActivatedRoute, private fb: FormBuilder, private iluminacionService: IluminacionService, private router: Router) {}
  iluminacionId!: number;
  alerta: any;
  editForm!: FormGroup;
  registroSeleccionado: any;
  loginError: string = '';
  
  ngOnInit(): void {
    this.rutaEdit.params.subscribe(
      (params: Params) => {
        this.iluminacionId = params['id'];
        console.log(this.iluminacionId, params['id']);                
      })
      this.getIluminacion();
      console.log(this.getIluminacion());
      
  }  

  initForm(): FormGroup {
    return this.fb.group({
      intensidad: ['100', [Validators.required]],
      encendido: [true, [Validators.required]],
    })
  }
  //Traer medidores para poder seleccionar para que medidor hacer la alerta

  getIluminacion() {
    const idParam = this.rutaEdit.snapshot.paramMap.get('id');
    this.iluminacionId = idParam ? +idParam : 0;
    this.editForm = this.initForm()
    // Obtener los datos de la alerta y establecerlos en el formulario
    this.iluminacionService.getIluminacionById(this.iluminacionId).subscribe(
      (data) => {
        this.editForm.patchValue({
          intensidad: data.intensidad,
          encendido: data.encendido,
        });
        console.log(data);
        
      },
      (error) => {
        console.log(error);
      }
    );
    
  }
  updateIluminacion(){

    const intensidad = parseInt(this.editForm.get('intensidad')?.value || '100');
    const encendido = this.editForm.get('encendido')?.value; 
    if(this.editForm.valid){

    this.iluminacionService.updateIluminacion(this.iluminacionId, intensidad, encendido).subscribe((iluminacion) => {
      
      console.log('iluminacion editada con éxito:');
      this.router.navigate(['/iluminacion']);
    },(error: any) => {
      console.error('Hubo un error al agregar la iluminacion', error);
    })
   }else{
    this.editForm.markAllAsTouched();
    this.loginError = 'Complete los campos';
    console.log('Fallo!!');    
  }
}
}