import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-producto-crear',
  templateUrl: './producto-crear.component.html',
  styleUrls: ['./producto-crear.component.css']
})
export class ProductoCrearComponent implements OnInit {

  @Input() producto: Producto;
  id: number;
  error: boolean;
  nota: string;
  descripcion: string;
  nombre: string;
  precio: number;
  temp:string;
  logo:string;
  productos= [];
  getId= [];
  
    constructor(private productosService: ProductoService,
      private route: ActivatedRoute,
      private router: Router,
      public dialogRef: MatDialogRef<ProductoCrearComponent>,
      @Inject(MAT_DIALOG_DATA) public message: string) { }
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    ngOnInit() {
      this.precio=0;
            //this.producto = this.productosService.getProducto(this.productosService.returnId());
            console.log(this.router.toString());
            this.productosService.getProductos2().subscribe(res => {
              this.productos = res as Producto[];
            })
  
  
    }
  
    ngOnDestroy(){
      console.log(this.productosService.getNextId(),this.nombre);
      this.getId= this.router.url.split('/');
      this.productosService.getNewProducto(this.getId[2],this.nombre,this.descripcion,this.precio,this.logo);
    }
  
   
    Validate(){
      if(this.precio<1){
       return true;
      }

      if(this.nombre==''){
        return true;
      }
    }
    
    nameExists(nombre: string){
      nombre.trim();
      let pos= this.productos.filter(n=> n.nombre.trim().toUpperCase() == nombre.toUpperCase()&&nombre.toUpperCase()!=this.producto.nombre.toUpperCase());
      console.log(pos);
      if(pos.length==0){
        return false;
      }
       return true;
     
    }

    isEmpty(nombre:string){
      if(nombre==''){
        return true;
      }
      return false;
    }

   

  }

