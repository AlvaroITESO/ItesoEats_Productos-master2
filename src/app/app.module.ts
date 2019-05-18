import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';

//import { AppRoutingModule } from './app-routing.module';
import { ProductosMainComponent } from './productos-main/productos-main.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { ProductoEditComponent } from './producto-edit/producto-edit.component';
import { ProductoComponent } from './productos-main/producto-lista/producto/producto.component';
import { ProductoListaComponent } from './productos-main/producto-lista/producto-lista.component';
import { Ng2PaginationModule } from 'ng2-pagination';
import { Routes, RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { ConfirmBorradoComponent } from './confirm-borrado/confirm-borrado.component';
import { HeaderComponent } from './header/header.component';
import { ConfirmChangeComponent } from './confirm-change/confirm-change.component';
import { ProductoCrearComponent } from './producto-crear/producto-crear.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { TiendaMainComponent } from './tienda-main/tienda-main.component';
import { TiendaListaComponent } from './tienda-main/tienda-lista/tienda-lista.component';
import { TiendaItemComponent } from './tienda-main/tienda-lista/tienda-item/tienda-item.component';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        BrowserModule,
       // AppRoutingModule,
        FormsModule,
        Ng2PaginationModule,
        RouterModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AdminComponent,
        LoginComponent,
        AppComponent,
        ProductoComponent,
        ProductosMainComponent,
        ProductoListaComponent,
        ProductoDetalleComponent,
        ProductoEditComponent,
        ModalConfirmComponent,
        ConfirmBorradoComponent,
        HeaderComponent,
        ConfirmChangeComponent,
        ProductoCrearComponent,
        ErrorMessageComponent,
        TiendaMainComponent,
        TiendaListaComponent,
        TiendaItemComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    exports:[
        RouterModule,
        ModalConfirmComponent,
        ConfirmBorradoComponent,
        ProductoEditComponent,
        ConfirmChangeComponent,
        ProductoCrearComponent,
        ErrorMessageComponent,
        HttpClientModule
    ],
    entryComponents: [ModalConfirmComponent,
        ConfirmBorradoComponent,
        ProductoEditComponent,
        ConfirmChangeComponent,
        ProductoCrearComponent,
        ErrorMessageComponent],

    bootstrap: [AppComponent]
})

export class AppModule { }