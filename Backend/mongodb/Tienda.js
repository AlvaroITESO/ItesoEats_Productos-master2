let {mongoose} = require('./mongodb-connect');

let tiendaSchema = mongoose.Schema({
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
    horario:{
        type: String,
        required:true,
    },
    logo:{
    type: String
    },
    });


let Tienda = mongoose.model('tienda',
tiendaSchema);
let newTienda = {id:3 ,nombre:"Chicanita",descripcion:"Buenas Hamburguesas", horario:"12-4",logo:"https://sifu.unileversolutions.com/image/es-ES/recipe-topvisual/2/1260-709/hamburguesa-new-york-classic-50243210.jpg"};
let tiendaModelo = Tienda(newTienda);
//tiendaModelo.save().then((doc) => console.log(doc)).catch((doc) => console.log(err+"2323"));



module.exports = {Tienda};