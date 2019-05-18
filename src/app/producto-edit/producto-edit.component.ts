import { Component, OnInit, Input, Inject } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {

  @Input() producto: Producto;
id: number;
error: boolean;
nota: string;
descripcion: string;
nombre: string;
precio: number;
temp:string;
productos:Producto[];
getId= [];

angForm: FormGroup;

  constructor(private productosService: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) {
      
     }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
         this.producto= this.productosService.getIndividualProduct(this.productosService.returnId()); 
          console.log(this.producto);    
          this.productos=this.productosService.getProductos();
          this.nombre=this.producto.nombre;
          this.descripcion=this.producto.descripcion;
          this.precio=this.producto.precio;


         
          //console.log(this.producto.nombre);
          
          //console.log(this.producto);
          this.createForm();


  }

  ngOnDestroy(){
    
    console.log("prueba");
    console.log(this.producto.id);//
    console.log(this.nombre);
    this.productosService.sendData(this.producto.id, this.nombre,this.descripcion,this.precio);
  }

  ngDoCheck(): void {
  this.Validate();
  }

 
  createForm() {
   this.angForm = this.fb.group({
      name: ['', Validators.required ],
      precio: ['', Validators.required ],
   });
 }

 Validate(){
  if(this.precio<0){
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

empty(){
  if(this.nombre==''||this.precio<=0){
    return true;
  }
  else{
    return false;
  }
}


}
