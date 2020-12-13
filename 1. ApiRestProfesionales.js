/*1. Conjunto de profesionales*/

class Professional {

    constructor (name, age, genre, weightKg, heightCm, hairColor, eyeColor, race, isRetired, nationality, oscarsNumber, profession, picture) {
    this.name = name;
    this.age = age;
    this.genre = genre;
    this.weightKg = weightKg;
    this.heightCm = heightCm;
    this.hairColor = hairColor;
    this.eyeColor = eyeColor;
    this.race = race;
    this.isRetired = isRetired;
    this.nationality = nationality;
    this.oscarsNumber = oscarsNumber;
    this.profession = profession;
    this.picture = picture;
    }
}

const express = require ("express");
const bodyParser = require ('body-parser');
const { userInfo } = require('os');
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

let profesionales = [];

app.get("/",
        function (request, response)
        {
            let respuesta = {error: true, codigo: 200, mensaje: 'Punto de inicio'};
            response.send(respuesta);
        }
        );

app.get("/profesional",
        function (request, response)
        {

            if(request.query.id) {
            response.send (profesionales[request.query.id])
            } else { response.send ("El profesional no existe")
            }
            
        }
        );

app.get("/profesionales",
        function (request, response)
        {
            response.send (profesionales)
        }
        );

app.post("/profesional",
        function(request, response)
        {
            let profesional = new Professional(request.body.name, request.body.age, request.body.genre, request.body.weightKg, request.body.heightCm, request.body.hairColor, request.body.eyeColor, request.body.race, request.body.isRetired, request.body.nationality, request.body.oscarsNumber, request.body.profession, request.body.picture);
            
            let respuesta   =   {error: false, codigo: 200, mensaje: "Profesional creado", resultado: profesional}
    
            profesionales.push(profesional);
            response.send(respuesta);
        }
        );


app.put("/profesional",
        function(request, response)
        {
            profesionales[request.body.id].name = request.body.name;
            profesionales[request.body.id].age = request.body.age;
            profesionales[request.body.id].genre = request.body.genre;
            profesionales[request.body.id].weightKg = request.body.weightKg;
            profesionales[request.body.id].heightCm = request.body.heightCm;
            profesionales[request.body.id].hairColor = request.body.hairColor;
            profesionales[request.body.id].eyeColor = request.body.eyeColor;
            profesionales[request.body.id].race = request.body.race;
            profesionales[request.body.id].isRetired = request.body.isRetired;
            profesionales[request.body.id].nationality = request.body.nationality;
            profesionales[request.body.id].oscarsNumber = request.body.oscarsNumber;
            profesionales[request.body.id].profession = request.body.profession;
            profesionales[request.body.id].picture = request.body.picture;
        
            let respuesta   =   {error: false, codigo: 200, mensaje: "Profesional actualizado", resultado: profesionales[request.body.id]}
            response.send(respuesta)  
        }
    );

app.delete("/profesional",
        function(request, response)
        {

            if (profesionales[request.body.id] != null) {
            profesionales[request.body.id] = null
            } 
            let respuesta   =   {error: false, codigo: 200, mensaje: "Profesional borrado"}
            response.send(respuesta);
            
        }

        );

app.use(function(req,res,next)
        {
            respuesta = {error: true, codigo: 404, mensaje: 'URL no encontrada'};
            res.status(404).send(respuesta);
        })

app.listen(3700);