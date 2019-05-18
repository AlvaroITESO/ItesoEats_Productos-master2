import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})



export class ModalConfirmComponent {

  
@Input() producto: Producto;
id: number;
error: boolean;
nota: string;
cantidad: number;


  constructor(private productosService: ProductoService,
    private route: ActivatedRoute,
    private location: Location,
    public dialogRef: MatDialogRef<ModalConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
      this.cantidad=1;

          this.producto = this.productosService.getProducto(this.productosService.returnId());
          console.log(this.producto);


  }

  ngOnDestroy(){
    this.productosService.getNota(this.nota,this.cantidad);
  }

 
  
  return() {
    this.location.back();
  }
}