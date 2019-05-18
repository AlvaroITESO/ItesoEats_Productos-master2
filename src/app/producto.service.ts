import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Producto } from './producto';
import { HttpClient } from '@angular/common/http';
import { ProductoListaComponent } from './productos-main/producto-lista/producto-lista.component';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  cambiaDato = new Subject<Producto[]>();
  public lastId = 1;

  productos: Producto[] = [/*
    new Producto(this.lastId++, 'Pizza Pepperoni', '8 rebanadas deliciosas', true, 129, 1,'',3),//HH
    new Producto(this.lastId++, 'Hamburguesa de res', 'Hamburguesa especialidad de la casa', true, 79, 1,'',3),
    new Producto(this.lastId++, 'Combo Básico', 'Hamburguesa de res más refresco de 600ml', true, 99, 1,'',3),
    new Producto(this.lastId++, 'Taco de Pastor', 'Taco normal con todos los ingredientes', true, 18, 1,'',2),
    new Producto(this.lastId++, 'Taco de Carne Asada', 'Incluye todos los ingredientes', true, 18, 1,'',2),
    new Producto(this.lastId++, 'Ensalada', 'Ensalada Chica', true , 48, 1,'',1),
    new Producto(this.lastId++, 'Emparedado', 'Delicioso emparedado', true, 32, 1,'',1),
    new Producto(this.lastId++, 'Megaburro Carne Asada', 'Gran comida', true, 60, 1,'',2),
    new Producto(this.lastId++, 'Pizza Mexicana', 'Pizza con los mejores sabores', true , 120, 1,'',3)//hh*/
    
  ];
carrito1: Producto[] = [];
 carrito: Producto[] = [];
 tmp: Producto;
 tmpProductos: Producto[];
currentLength=0;
suma=0;
a=-1;
n="No hay nota";
cantidad=1;
newProductId=-1;

constructor(private http: HttpClient
 ){}

  idEditar = -1;
  nombreEditar= '';
  descripcionEditar='';
  precioEditar=0;
 newProduct=new Producto(0,'','',true,0,1,'',1);






  getNextId(): number {
    return this.lastId;
  }

 /* getProductos2() {
    let tmp=[];
    // now returns an Observable of Config
    this.http.get('http://127.0.0.1:3000/api/productos')
    .subscribe((data:Producto[]) =>{this.productos = {...data}
    
    console.log(data[0].nombre.toString());
    for(let i=0;i<data.length;i++){
      let a = new Producto(Number(data[0].id.toString()),data[0].nombre.toString(),data[0].descripcion.toString(),
      data[i].disponible,Number(data[i].precio.toString), data[i].nota, data[0].cantidad, Number(data[0].tiendaId.toString));
      
    
    }
  }
    );
    this.productos=tmp.slice();
    
    return tmp;
    

    
  }*/
  getProductos2(){
    return this.http.get('http://127.0.0.1:3000/api/productos');
  }

  setProductos(productos: Producto[]){
    this.productos=productos;
    console.log(this.productos);
  }

  
  getIndividualProduct(id: number){
  const pro= this.productos.find(pro => pro.id == id);
  return pro;
   
  }

  getProductoById2(id: string){
    let url='http://127.0.0.1:3000/api/tienda/'
    return this.http.get(url+id);
  }
  getProductos(): Producto[] {
    return this.productos.slice();
  }

  getProductosbyId(id: number): Producto[]{
    const tmp=[];
    console.log(id);
    
    this.productos.forEach(p => {
      if(p.tiendaId+""==id+""){
        tmp.push(p);
      }
      
    })
    //console.log(tmp);
    return tmp.slice();

  }

  RestarProducto(){
    this.currentLength--;
  }

  SumarProducto(){
    this.currentLength++;
  }

  AddProduct(producto: Producto){
    this.productos.push(producto);
  }

  

  getProducto(id: number): Producto {
    const pos = this.productos.findIndex(al => al.id === id);
    return Object.assign({}, this.productos[pos]);
  }

  notificarCambios() {
    this.cambiaDato.next(this.productos.slice());
  }
  notificarCambiosCarrito() {
    this.cambiaDato.next(this.carrito.slice());
  }

  getCurrentLenght(){
    return this.currentLength;
  }

  addToCart(producto: Producto, notaProducto: string, cantidadProducto: number): boolean {
    const pro = this.carrito.find(pro => pro.nombre.toUpperCase() === producto.nombre.toUpperCase());
    if (pro) {
      return false;
    }
    producto.nota=notaProducto;
    producto.cantidad=cantidadProducto;
    this.carrito.push(Object.assign({}, producto));
    this.notificarCambiosCarrito();
    console.log("Prueba");
    this.productos=this.getProductos();
    return true;
  }

 

  getCarrito(): Producto[] {
    return this.carrito.slice();
  }

 

  borrarProductoTienda(id: number): boolean {
    console.log(id);//H
    this.tmp =this.getIndividualProduct(id);
    const pos = this.productos.findIndex(p => p.id == id);
    if(pos >= 0){
      console.log("hola");
      this.productos.splice(pos,1);
      console.log(this.productos);
    }
    this.notificarCambios();
      console.log(this.tmp.nombre);
      console.log(this.tmp.tiendaId);
      this.http.delete("http://127.0.0.1:3000/api/tienda/"+this.tmp.tiendaId+'/'+ id).subscribe(
        (val) => {
            console.log("Delete call successful value returned in body", 
                        val);
        },
        response => {
            console.log("Delete call in error", response);
        },
        () => {
            console.log("The delete observable is now completed.");
        });

   
    return false;
  }

  borrarProducto(id: number): boolean {
    console.log("hola");
    const pos = this.carrito.findIndex(p => p.id == id);
    if (pos >= 0) {
      this.carrito.splice(pos, 1);
      this.notificarCambiosCarrito();
      return true;
    }
    return false;
  }

  

  saveId(id:number): void{
    this.a=id;
  }

  returnId(): number{
    return this.a;
  }

  getNota(nota:string, cantidadCarrito: number):void {
    this.n=nota;
    this.cantidad=cantidadCarrito;
  }

  returnNota(){
   let a=[];
    a.push(this.n);
    a.push(this.cantidad);
    return a;
    
  }

  editProducto(id:number, nombreEditar:string, descripcionEditar: string, precioEditar: number){
  console.log(id);
  this.tmp =this.getIndividualProduct(id);
  let objIndex = this.productos.findIndex((obj => obj.id == id));
  this.productos[objIndex].nombre = nombreEditar;
  this.productos[objIndex].descripcion = descripcionEditar;
  this.productos[objIndex].precio = precioEditar;
console.log(this.productos);
    this.http.patch("http://127.0.0.1:3000/api/tienda/"+this.tmp.tiendaId+'/'+ id,
    {
        "nombre": nombreEditar,
        "descripcion": descripcionEditar,
        "precio": precioEditar
    })
    .subscribe(
        (val) => {
            console.log("PATCH call successful value returned in body", 
                        val);
        },
        response => {
            console.log("PATCH call in error", response);
        },
        () => {
            console.log("The PATCH observable is now completed.");
        });
 
  

  }

  CreateProduct(producto: Producto, id:string){
    this.productos.push(producto);
    this.http.post("http://127.0.0.1:3000/api/tienda/"+id, producto).subscribe(
      producto =>{
        console.log("Funcionó");
        return true;
      }
    )
  }

  getData(){
    let a=[];
    a.push(this.idEditar);
    a.push(this.nombreEditar);
    a.push(this.descripcionEditar);
    a.push(this.precioEditar);
    return a;
  }

  sendData(id: number, nombre: string, descripcion: string, precio: number){
    this.idEditar=id;
    this.nombreEditar=nombre;
    this.descripcionEditar=descripcion;
    this.precioEditar=precio;
  }

  changeD(id: number){
    console.log(id);
   this.tmp= this.getIndividualProduct(id)
   let objIndex = this.productos.findIndex((obj => obj.id == id));
    this.productos[objIndex].disponible = !this.productos[objIndex].disponible;
    console.log(this.productos);
      console.log(this.tmp.nombre);
      let b= this.tmp.tiendaId;
      this.http.patch("http://127.0.0.1:3000/api/tienda/"+this.tmp.tiendaId+'/'+ id,
      {
          "disponible": !this.tmp.disponible
      }) .subscribe(
        (val) => {
            console.log("PATCH call successful value returned in body", 
                        val);
        },
        response => {
            console.log("PATCH call in error", response);
        },
        () => {
            console.log("The PATCH observable is now completed.");
        });

      
   
   
    
  }

  getNewProducto(id: number, nombreNuevo: string, descripcionNueva:string, precioNuevo:number,logo: string){
     this.newProduct=new Producto(this.getNewId(),nombreNuevo,descripcionNueva,true,precioNuevo,1,'',id);
    
  }

  getNewId(){
    
   let maxValueOfY = Math.max(...this.productos.map(o => o.id), 0);
    console.log(maxValueOfY);
    maxValueOfY++;
    console.log(maxValueOfY);
    return (maxValueOfY);
  }

  returnNewProducto(){
    return this.newProduct;
  }

  sendTiendaId(id: string){
    this.newProductId=Number(id);
  }

  getTiendaId(){
    return this.newProductId;
  }

}//gfgfccc
 
