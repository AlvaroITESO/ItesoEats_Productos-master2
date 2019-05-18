
//import {mongoose} from './mongodb-connect';
let {mongoose} = require('./mongodb-connect');

let productoSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        min:1,
        unique: true
    },
    nombre: {
    type: String,
    required: true
    },
    descripcion: {
    type: String,
    },
    disponible:{
        type:Boolean,
    },
    precio:{
        type: Number,
        min:0,
        required:true,
    },
    cantidad:{
    type: Number,
    min: 1,
    max: 5,
    },
    nota:{
        type:String
    },
    tiendaId:{
        type:Number,
        min:1,
        required: true
    }
    });


let Producto = mongoose.model('producto',
productoSchema);
let newProducto = {id:9 ,nombre:"Pizza mexicana",descripcion:"Pizza con los mejores sabores", disponible:true, precio:120,cantidad:1,nota:'', tiendaId:3};

let productoModelo = Producto(newProducto);
//productoModelo.save().then((doc) => console.log(doc)).catch((doc) => console.log(err));



module.exports = {Producto};