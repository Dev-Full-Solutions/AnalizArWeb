import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/service/registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  constructor(private userService: RegistroService) {}

  users: any[] = [];
  ngOnInit(): void {
    this.getUsers()
  }
  getUsers(){
    this.userService.getUsers().subscribe((data: any) =>{
      this.users = data      
    })
  }
  removeUser(id:number) {

    Swal.fire({
      title: "Estás seguro de eliminar al usuario?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
  
        this.userService.removeUser(id).subscribe((user) => {
          console.log('Usuario eliminado con exito!!', user);
          this.getUsers();      
        }, (error: any) => {
          console.error('Hubo un error al eliminar el usuario', error);
          
        });
  
        Swal.fire({
          title: "Eliminado!",
          text: "El usuario ha sido eliminado con éxito",
          icon: "success"
        });
      }
    });

    
  }
}
