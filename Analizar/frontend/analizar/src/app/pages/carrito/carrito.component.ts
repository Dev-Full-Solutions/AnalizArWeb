import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { retry } from 'rxjs';
import { ProductosService } from 'src/app/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  datos: any[] = [];
  producto!: string;
  result!: string;
  mensajeCheckout: string = '';
  total = this.calcularValorTotal()

  constructor( private ProductosService: ProductosService, private route: ActivatedRoute){}

  ngOnInit(){
    this.verCarrito()
    this.statusCheckout()
  }
  statusCheckout(){
    this.route.queryParams.subscribe(params => {
      this.result = params['result'];
      // Lógica para mostrar mensaje en base al resultado
      if (this.result === 'success') {
        //console.log('Los productos fueron abonados con éxito');
        this.mensajeCheckout = 'Los productos fueron abonados con exito';
      } else if (this.result === 'failure') {
        //console.log('Ocurrió un problema durante la transacción');
        this.mensajeCheckout = 'Hubo un error al abonar los productos';
      } else if (this.result === 'pending') {
        //console.log('La transacción está pendiente');
        this.mensajeCheckout = 'El pago esta pendiente por el momento';
      }
      })
  }
  verCarrito(){
    let datos: any[] = [];
    let flag = true;
    if(localStorage.getItem('mi-carrito') != null){
      let carrito = this.obtenerCarritoLocalStorage()
      console.log(carrito)

      for(let item of carrito){
        if(flag){
          datos.push({
            "id": String(item.producto.id),
            "url": item.producto.rutaImagen,
            "tipoProducto": item.tipoProducto,
            "nombre": item.tipoProducto === "medidor" ? item.producto.descripcion : item.producto.nombre,
            "cantidad": item.cantidad,
            "precio": item.producto.precio
          })
          flag = false
        } else {
          if(datos.find((el)=> Number(el.id) === item.producto.id) != undefined){
            let datoAModificar = datos.find((el)=> Number(el.id) === item.producto.id);
            datoAModificar!.cantidad += item.cantidad
          }else{
            datos.push({
              "id": String(item.producto.id),
              "url": item.producto.rutaImagen,
              "tipoProducto": item.tipoProducto,
              "nombre": item.tipoProducto === "medidor" ? item.producto.descripcion : item.producto.nombre,
              "cantidad": item.cantidad,
              "precio": item.producto.precio
            })
          }
        }
      }

      this.datos = datos
      this.total = this.calcularValorTotal()

    }else{
      console.log('Algo malio sal')
    }
  }

  aumentarCantidad(id:string, tipoProducto:string){
    if(tipoProducto === 'medidor'){
      for(let el of this.datos){
        if(el.id === id){
          this.ProductosService.getProductoById(Number(id)).subscribe(data => {
            console.log(data)
            if(data.cantidadDisponible > 0){
              data.cantidadDisponible -= 1
              this.ProductosService.updateProductoById(Number(id),data).subscribe(data => data)
              el.cantidad += 1
              this.modificarItemCarrito(Number(id),'aumentar',1)
            }else{
              console.log("No quedan mas unidades")
            }
            this.total = this.calcularValorTotal()
          })
          
        }
      }
    }
  }

  disminuirCantidad(id:string, tipoProducto:string){
    if(tipoProducto === 'medidor'){
      for(let el of this.datos){
        if(el.id === id){
          if(el.cantidad > 0){
            this.ProductosService.getProductoById(Number(id)).subscribe(data => {
              console.log(data)
              data.cantidadDisponible += 1
              this.ProductosService.updateProductoById(Number(id),data).subscribe(data => data)
              el.cantidad -= 1
              this.modificarItemCarrito(Number(id),'disminuir',1)
              this.total = this.calcularValorTotal()
            })
            
          }
        }
      }
    }
  }
  closeAlert(){
    const  alert = document.querySelector('#alerta');
    alert?.classList.add('d-none')
  }
  calcularValorTotal(){
    let total = 0
    let cantidad = 0

    if(this.datos.length > 0){
      for(let el of this.datos){
        total += el.cantidad * el.precio
        cantidad += el.cantidad
      }
    }

    return [total,cantidad]
  }

  eliminarItem(id:string, tipoProducto:string){

    Swal.fire({
      title: "Estás seguro de eliminar el elemento del carrito?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
  
        let indice = 0

    for(let i = 0; i < this.datos.length; i++){
      if(this.datos[i].id === id){
        indice = i
        if(tipoProducto === 'medidor'){
          this.ProductosService.getProductoById(Number(id)).subscribe(data => {
            data.cantidadDisponible += this.datos[i].cantidad
            this.ProductosService.updateProductoById(Number(id),data).subscribe(data => data)
            this.datos.splice(indice,1)
            this.modificarItemCarrito(Number(id),'eliminar',0)
            this.total = this.calcularValorTotal()
          })
        }else{
          this.datos.splice(indice,1)
          this.modificarItemCarrito(Number(id),'eliminar',0)
          this.total = this.calcularValorTotal()
        }
       
      }
    }
  
        Swal.fire({
          title: "Eliminado!",
          text: "El producto ha sido eliminado del carrito con éxito",
          icon: "success"
        });
      }
    });

    
  }

  obtenerCarritoLocalStorage(){
    return JSON.parse(localStorage.getItem('mi-carrito')!);
  }

  modificarItemCarrito(id:number, tipoModificacion:string, cantidad:number){
    let carrito = this.obtenerCarritoLocalStorage()
    
    for(let item of carrito){
      if(item.producto.id === id){
        
        if(tipoModificacion === 'aumentar'){
          item.cantidad += cantidad
        }
        
        if(tipoModificacion === 'disminuir'){
          item.cantidad -= cantidad
        }
        
        if(tipoModificacion === 'eliminar'){
          let index = carrito.findIndex((el:any)=> el.producto.id === id)
          carrito.splice(index,1)
        }
      }
    }

    this.guardarCarritoLocalStorage(carrito)

  }

  guardarCarritoLocalStorage(carrito:any){
    localStorage.setItem('mi-carrito',JSON.stringify(carrito))
  }
  generateCheckout(productPrice: number): void {
      let carrito = this.obtenerCarritoLocalStorage()
      for(let item of carrito){
        this.producto = item.tipoProducto
      }
      
      this.ProductosService.generateCheckout(productPrice, this.producto)
        .subscribe(
          (response) => {
            const paymentLink = response.payment_link;
            console.log('Enlace de pago:', paymentLink);
            // Aquí puedes proporcionar el enlace de pago al usuario o redirigirlo a la página de pago correspondiente
            localStorage.removeItem('mi-carrito');
            this.verCarrito();
            window.open(paymentLink, '_blank');
          },
          (error) => {
            console.error('Error al generar el enlace de pago:', error);
          }
        );
    }
}
