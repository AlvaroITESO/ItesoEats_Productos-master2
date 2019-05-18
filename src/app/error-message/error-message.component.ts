import { Component, OnInit, Inject } from '@angular/core';
import { ProductoService } from '../producto.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  constructor(private productosService: ProductoService,
    public dialogRef: MatDialogRef<ErrorMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

  ngOnDestroy(){
    //this.productosService.getNota(this.nota);
  }

 

}
