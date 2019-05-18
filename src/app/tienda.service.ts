import { Injectable } from '@angular/core';
import { Tienda } from './tienda';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  cambiaDato = new Subject<Tienda[]>();
  private lastId = 1;

  tiendas: Tienda[] = [];
    

  
  constructor(private http: HttpClient) { }

  notificarCambios() {
    this.cambiaDato.next(this.tiendas.slice());
  }

  getTiendas(){
  return this.tiendas.slice();
  }

  getTiendas2(){
    return this.http.get('http://127.0.0.1:3000/api/tienda');
  }
}
