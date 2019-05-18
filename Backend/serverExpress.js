'use strict'
const express = require('express');
const fs = require('fs');

const bodyParser = require('body-parser')
const cors = require('cors');
let {Alumno} = require('./mongodb/Alumno');
let {User} = require('./mongodb/User');
let {Producto} = require('./mongodb/Producto');
let {Tienda} = require('./mongodb/Tienda');




const app = express();
const port = process.env.PORT || 3000;

let alumnos = JSON.parse(fs.readFileSync('alumnos.json'));

let jsonParser = bodyParser.json();
let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}


app.use(jsonParser);
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));
//app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

function autenticar(req,res, next){
    let token = req.get('x-auth');
    if(!token){
        res.status(401).send({error: "no hay token"});
        return;
    }

    User.verificarToken(token).then((user)=>{
        console.log("Token verificado ...");
        req.userid = user._id;
        next();
    }).catch((err)=>{
        res.status(401).send(err);
    });

}

app.route('/api/tienda/:idTienda/:idProducto').patch((req, res) => {
    let id = req.params.idProducto;
    Producto.findOneAndUpdate({
        id:id
    },{
            $set: req.body
    },{
         new:true
    }, (err,docs) =>{
        if (err || docs === null) {
            console.log(err);
            console.log(docs);
            
            res.status(400).send();
            return;
        }
        res.json(docs);
    })
}
)
.delete((req, res)=>{
    let id = req.params.idProducto;
    Producto.findOneAndDelete({id:id}, (err, docs) => {
    if(err || docs === null) {
        console.log(err);
        console.log(docs);
        res.status(400).send();
        return; 
    }
    res.json(docs);
})

});
app.route('/api/pro/:id').get((req, res) => {
        let id=req.params.id;
       Producto.findOne({id:id},{_id:0,id:1,nombre:1,descripcion:1,precio:1,disponible:1,cantidad:1,tiendaId:1},(err,docs)=>{
            if(err){
                res.status(404).send();
                return;
            }

            res.json(docs);
        })
       
    
    })

app.route('/api/tienda/:idTienda')
.get((req, res) => {
        let idTienda=req.params.idTienda;
       Producto.find({tiendaId:idTienda},{_id:0,id:1,nombre:1,descripcion:1,precio:1,disponible:1,cantidad:1,tiendaId:1},(err,docs)=>{
            if(err){
                res.status(404).send();
                return;
            }

            res.json(docs);
        })
       
    
    }).post((req, res) =>{
        
        let newProducto = new Producto(req.body);
        console.log(newProducto);
        if(req.body.nombre && req.body.descripcion && req.body.precio>0 ){
        newProducto.save((err,doc)=>{
            if(err)
                console.log(err);

            if(doc){
                res.status(201).send({
                    Producto: "agregado"}
                );
                return;
            }else{
                res.status(400).send({
                    error: "faltan atributos"
                })
            }
        });
    }});
app.route('/api/productos')
    .get((req, res) => {
       Producto.find({},{_id:0,id:1,nombre:1,descripcion:1,precio:1,disponible:1,cantidad:1,tiendaId:1},(err,docs)=>{
            if(err){
                res.status(404).send();
                return;
            }

            res.json(docs);
        }) 
    
    });

    app.route('/api/tienda')
    .get((req, res) => {
       Tienda.find({},{_id:0,id:1,nombre:1,descripcion:1,horario:1,logo:1},(err,docs)=>{
            if(err){
                res.status(404).send();
                return;
            }

            res.json(docs);
        }) 
    
    });
    
    


app.route('/api/user/login')
    .post((req, res)=>{
         

         let usr = req.body.email;
         let pwd = req.body.password;
         console.log("usr:"+usr+ " pwd:"+pwd);
        
         User.findOne({email:usr}).then((user)=>{
             console.log(user);
            if(pwd == user.password){
               let token =  user.generateToken();
               user.token = token;
               User.updateOne({email:usr}, user).then((usrUpdated)=>{
                    console.log("actualizado");
                    console.log(usrUpdated);
                    res.set('x-auth',token);
                    res.send();
                    return;
               }).catch((er)=>{
                   console.log(er);
                   res.status(400).send(er);
               })
            }
         }).catch((err)=> {
             console.log(err);
             res.status(400).send(err);
         })
         
    })

app.route('/api/user/logout')    
    .get((req, res)=>{
       let token = req.get('x-auth');
       if(!token){
           console.log("no existe token");
           res.status(400).send({error: "falta header con token"})
           return;
       }    

       // * SE ASUME QUE SI HAY TOKEN
       let datosUsuario = User.verDatosToken(token);
       console.log(datosUsuario);
       if(datosUsuario && datosUsuario._id){
           
           User.updateOne({_id:datosUsuario._id},{token: "123"}).then((doc)=>{
              res.send(doc);
           }).catch((err)=>{
               console.log(err);
               res.status(404).send();
           })
       }
    })


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function partialUpdateAlumno(id, alumno){
    let pos = alumnos.findIndex(al => al.id == id);

    if(pos>=0){
        alumnos[pos].nombre = (alumno.nombre)? alumno.nombre: alumnos[pos].nombre;
        alumnos[pos].carrera = (alumno.carrera)? alumno.carrera: alumnos[pos].carrera;
        alumnos[pos].calificacion = (alumno.calificacion)? alumno.calificacion: alumnos[pos].calificacion;
        fs.writeFileSync('alumnos.json', JSON.stringify(alumnos));
        return true;
    }
   
    return false;

}

function updateAlumno(id, alumno) {
    let pos = alumnos.findIndex(al => al.id == id);

    if(pos>=0 && id == alumno.id){
        Object.assign(alumnos[pos], alumno);
        fs.writeFileSync('alumnos.json', JSON.stringify(alumnos));
        return true;
    }

    return false;
}


function existeId(req, res, next){
   
    let i= req.body.id;
    let id = Alumno.findOneAndUpdate({id: 1})
   

    let pos = alumnos.findIndex(al=> al.id == id);
    if(pos==-1){
        res.status(404).send({error:"Id no existe"});
        return;
    }

    next();
}
    
