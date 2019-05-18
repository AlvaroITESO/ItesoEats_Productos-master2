import { Component, OnInit, Input, Inject } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-change',
  templateUrl: './confirm-change.component.html',
  styleUrls: ['./confirm-change.component.css']
})
export class ConfirmChangeComponent implements OnInit {

  @Input() producto: Producto;
id: number;
error: boolean;
nota: string;


  constructor(private productosService: ProductoService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<ConfirmChangeComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
         this.producto=this.productosService.getIndividualProduct(this.productosService.returnId());
        
          console.log(this.producto);


  }

  displayD(){
    if(this.producto.disponible){
      return 'Disponible';
    }
    else{
      return 'Agotado'
    }
  }

  ngOnDestroy(){
    //this.productosService.getNota(this.nota);
  }


}