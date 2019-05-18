import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { Tienda } from '../../tienda';
import { TiendaService } from '../../tienda.service';

@Component({
  selector: 'app-tienda-lista',
  templateUrl: './tienda-lista.component.html',
  styleUrls: ['./tienda-lista.component.css']
})
export class TiendaListaComponent implements OnInit {
  private subscript: Subscription;
  tiendas=[]

  constructor(private tiendaService: TiendaService,
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog ) { }

  ngOnInit() {
    this.tiendaService.getTiendas2().subscribe(res => {
      this.tiendas = res as Tienda[];
    })
  }

}
