


ngOnInit(): void{
  this.aireacForm = this.initForm()
  this.getaireac()
  
 }
 getaireac(){
  this.aireacService.getaireac().subscribe((data: any) => {
    this.aireac = data   
  })
 }
   //Validaciones para los campos
   saveaireac() {
    const nombre = this.aireacForm.get('nombre')?.value;
    const detalle = this.aireacForm.get('detalle')?.value;
    const intensidad = parseInt(this.aireacForm.get('intensidad')?.value);
    const encendido = this.aireacForm.get('encendido')?.value || false; 
    const identificador = this.aireacForm.get('identificador')?.value || '';
    let userId = Number(localStorage.getItem('userId')!);
    console.log(nombre, detalle, identificador, intensidad, encendido, userId);
  
    if (this.aireacForm.valid) {
      this.aireacService.addaireac(nombre, detalle, identificador, userId, intensidad, encendido)
        .subscribe((aireac: any) => {
          console.log('aireac agregada con éxito:', aireac);
          this.closeModal();
          this.getaireac();
        }, (error: any) => {
          console.error('Hubo un error al agregar la aireac', error);
        });
    } else {
      this.aireacForm.markAllAsTouched();
      this.loginError = 'Complete los campos';
    }
  }
  
 removeaireac(id:number){  

  Swal.fire({
    title: "Estás seguro de eliminar el sistema de iluminación?",
    text: "No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar!"
  }).then((result) => {
    if (result.isConfirmed) {

      this.aireacService.removeaireac(id).subscribe((aireac) => {
        console.log('aireac eliminada con éxito:', aireac);
        this.closeModal();
        this.getaireac()
      }, (error: any) => {
        console.error('Hubo un error al eliminar la aireac', error);
      })

      Swal.fire({
        title: "Eliminado!",
        text: "El sistema de iluminación ha sido eliminado con éxito",
        icon: "success"
      });
    }
  });

  

 }

 
  //Abrir modal
  openModal(): {
      modal.style.display ='flex'; 
      this.aireacForm.reset();     
    }
    if(contenedorAlertas != null) {
      contenedorAlertas.style.display ='none';
    }
  }

  openEditModal(aireac: any): void{
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
      encendido: [true, []],
      identificador: [''],
    })
  }

}
function openModal() {
  throw new Error("Function not implemented.")
}

