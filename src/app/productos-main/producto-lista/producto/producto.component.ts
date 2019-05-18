import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../../producto';
import { MatDialog } from '@angular/material';
import { ModalConfirmComponent } from '../../../modal-confirm/modal-confirm.component';
import { ProductoService } from '../../../producto.service';
import { ConfirmBorradoComponent } from '../../../confirm-borrado/confirm-borrado.component';
import { ProductoListaComponent } from '../producto-lista.component';
import { ProductoEditComponent } from '../../../producto-edit/producto-edit.component';
import { ConfirmChangeComponent } from '../../../confirm-change/confirm-change.component';
import { ErrorMessageComponent } from '../../../error-message/error-message.component';



@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
 

  @Input() producto: Producto;
  @Output() detalle = new EventEmitter();
  @Output() borrar = new EventEmitter();
  @Output() añadir = new EventEmitter();
  modoCarrito= false;

  constructor(public dialog: MatDialog,
    public  productoLista: ProductoListaComponent,
    public productoservice : ProductoService) { }

  ngOnInit() {
    this.modoCarrito = this.productoLista.modoCarrito;

    
  }

  openDialog(): void {
    this.productoservice.saveId(this.producto.id);
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '350px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        
        console.log(this.producto);
        const a=this.productoservice.returnNota();
        this.productoservice.addToCart(this.producto, a[0]==undefined? "No": a[0],a[1]>0? a[1]:1);
        

      }
    });
  }

  openDelete(): void {
    this.productoservice.saveId(this.producto.id);
    const dialogRef = this.dialog.open(ConfirmBorradoComponent, {
      width: '350px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        
        console.log("Borrado")
        if(!this.productoLista.modoCarrito)
        this.productoservice.borrarProductoTienda(this.producto.id);
        else{
          this.productoservice.borrarProducto(this.producto.id);

        }
        //this.productoservice.addToCart1(this.producto);

      }
    });
  }

  openEdit(): void {
    console.log(this.producto.id);
    this.productoservice.saveId(this.producto.id);
    const dialogRef = this.dialog.open(ProductoEditComponent, {
      width: '600px',
      height: '400px'
    });

    dialogRef.beforeClosed().subscribe(result => {
      if(result) {
        console.log("hola2");
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let edit= this.productoservice.getData();
        console.log(edit[0]);
       this.productoservice.editProducto(edit[0],edit[1],edit[2],edit[3]);

      }
    });
  }

  openChange(): void {
    this.productoservice.saveId(this.producto.id);
    console.log(this.producto.id);
    const dialogRef = this.dialog.open(ConfirmChangeComponent, {
      width: '350px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {

        this.productoservice.changeD(this.producto.id);
        
      }
    });
  }

  showMessage(): void {
    const dialogRef = this.dialog.open(ErrorMessageComponent, {
      width: '350px',
      height: '150px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {        
      }
    });
  }

  getState(){
    return this.producto.disponible;
  }

  borrarProductoCarrito(){
    this.productoservice.borrarProducto(this.producto.id);
  }
}
