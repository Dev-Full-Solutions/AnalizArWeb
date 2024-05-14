import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/productos.service';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  servicios: any[] = [];
  loginError: string = '';
  constructor (private productosService: ProductosService, private authService: AuthService ) {}

  ngOnInit(): void {
    this.getServicios()
  }
  getServicios(){
    this.productosService.getServicios().subscribe((servicios) => {
      //console.log(servicios);
      this.servicios = servicios;
    }, (error: any) => {
      console.error('Hubo un error al obtener los servicios', error);
    })
  }
  isAdmin(): boolean {
    return this.authService.getIsAdmin();
  }
  removeProducto(id: number){
    this.productosService.removeProducto(id).subscribe((product: any) => {
      console.log('Producto eliminado con exito:', product);
      this.getServicios()
    }, (error: any) => {
      console.error('Hubo un error al eliminar el producto', error);
    })
  }

  agregarCarrito(producto:any, tipoProducto:string){

    if(localStorage.getItem('mi-carrito') != null){
      let carritoActual = JSON.parse(localStorage.getItem('mi-carrito')!)
      let seAgregoElemento = false

      for(let item of carritoActual){
        if(item.producto.id === producto.id){
          item.cantidad += 1
          seAgregoElemento = true
        }
      }

      if(!seAgregoElemento){
        carritoActual!.push({producto,"cantidad":1, tipoProducto})
      }

      localStorage.setItem('mi-carrito',JSON.stringify(carritoActual))
    }else{
      let carritoActual = JSON.stringify([{producto,"cantidad":1, tipoProducto}])
      localStorage.setItem('mi-carrito',carritoActual)
    }

    Swal.fire({
      icon: 'success',
      title: 'Éxito!',
      text: 'Se agregó el producto al carrito!'
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
