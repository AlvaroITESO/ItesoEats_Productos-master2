export class Producto {
    constructor(
      public id: number,
      public nombre: string,
      public descripcion: string,
      public disponible: boolean,
      public precio: number,
      public cantidad: number,
      public nota: string,
      public tiendaId: number,
    ){}
    }