
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-confirm-borrado',
  templateUrl: './confirm-borrado.component.html',
  styleUrls: ['./confirm-borrado.component.css']
})





export class ConfirmBorradoComponent {

  
@Input() producto: Producto;
id: number;
error: boolean;
nota: string;


  constructor(private productosService: ProductoService,
    private route: ActivatedRoute,
    private location: Location,
    public dialogRef: MatDialogRef<ConfirmBorradoComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
          this.producto = this.productosService.getProducto(this.productosService.returnId());
          console.log(this.producto);


  }

  ngOnDestroy(){
    //this.productosService.getNota(this.nota);
  }

 
  
  return() {
    this.location.back();
  }
}