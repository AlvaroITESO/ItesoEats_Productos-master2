
//import {mongoose} from './mongodb-connect';
let {mongoose} = require('./mongodb-connect');

let alumnoSchema = mongoose.Schema({
    nombre: String,
    edad: {
    type: Number,
    min: 18,
    max: 80,
    required: true
    },
    carrera: {
    type: String,
    enum: ['IE', 'ISC', 'IES', 'ISI'],
    required: true
    },
    calificacion: {
    type: Number,
    min: 50,
    max: 100,
    require: true,
    }
    });


let Alumno = mongoose.model('alumnos',
alumnoSchema);
let newAlumno = {nombre: "Juan",edad: 28,carrera:
"IES", calificacion: 80};
let alumnoModelo = Alumno(newAlumno);
//alumnoModelo.save().then((doc) => console.log(doc)).catch((doc) => console.log(err));

Alumno.find({calificacion: {$gte: 60}}, (err,docs)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(docs);
    }
});

module.exports = {Alumno}