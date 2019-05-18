import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { Role } from './_models';
import { NgModule } from '@angular/core';
import { ProductoListaComponent } from './productos-main/producto-lista/producto-lista.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { ProductosMainComponent } from './productos-main/productos-main.component';
import { TiendaMainComponent } from './tienda-main/tienda-main.component';
import { TiendaListaComponent } from './tienda-main/tienda-lista/tienda-lista.component';


const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'admin', 
        component: AdminComponent, 
        canActivate: [AuthGuard], 
        data: { roles: [Role.Admin] } 
    },
    { 
        path: 'login', 
        component: LoginComponent 
    },
    {path: 'home', component: TiendaMainComponent},
    {path: 'productos', component: ProductosMainComponent, children: [
            {path: '', component: ProductoListaComponent},
            {path: ':id', component: ProductoDetalleComponent},
    ], canActivate: [AuthGuard], 
        data: { roles: [Role.User, Role.Admin] }},
    {path: 'tienda', component: TiendaMainComponent, children: [
      {path: '', component: TiendaListaComponent},
      {path: ':id', component: ProductoListaComponent}
      ]},
    {path: 'carrito',  component: ProductosMainComponent, children: [
    {path: '', component: ProductoListaComponent},
    {path: ':id', component: ProductoDetalleComponent}
    ]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);