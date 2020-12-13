/*3.------------------Película con profesionales------------------*/
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

class Movie {
    constructor (title, releaseYear, actors, nationality, director, writer, genre, picture) {
        this.title = title;
        this.releaseYear = releaseYear;
        this.actors = actors
        this.nationality = nationality;
        this.director = director;
        this.writer = writer;
        this.genre = genre;
        this.picture = picture;
    }
}

const express = require ("express");
const bodyParser = require ('body-parser');
const { userInfo } = require('os');
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

let actores = [];

let pelicula = new Movie ("Interstellar", 2014, actores, "american", null, null, "drama", "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT_RccL1NBnzoF49rygF-O0YRB2-kIsi_u2OY4nhmV9hRCWbHok");


app.get("/",
        function (request, response)
        {
            let respuesta = {error: true, codigo: 200, mensaje: 'Punto de inicio'};
            response.send(respuesta);
        }
        );

app.get("/pelicula",
        function (request, response)
        {
            response.send(pelicula);
        }
        );

app.get("/pelicula/actores",
        function (request, response)
        {
            response.send (actores)
        }
        );

app.get("/pelicula/actor",
        function (request, response)
        {

            if(request.query.id) {
            response.send (actores[request.query.id])
            } else { response.send ("El actor no existe")
            }
            
        }
        );
app.get("/pelicula/director",
        function (request, response)
        {
            let respuesta;
            if (pelicula.director !=null)
                respuesta = pelicula.director;
            else
                respuesta = {error: true, codigo: 200, mensaje: "El director no existe"}

            response.send(respuesta);
        }
        );

app.get("/pelicula/guionista",
        function (request, response)
        {
            let respuesta;
            if (pelicula.guionista !=null)
                respuesta = pelicula.guionista;
            else
                respuesta = {error: true, codigo: 200, mensaje: "El guionista no existe"}

            response.send(respuesta);
        }
        );

app.post("/pelicula",
        function(request, response)
        {
            let respuesta;
            if (pelicula===null)
            {
                pelicula = new Movie(request.body.title,request.body.releaseYear, request.body.actors, request.body.nationality, request.body.director, request.body.writer, request.body.genre, request.body.picture);
                
                respuesta   =   {error: false, codigo: 200,
                                mensaje: "Película creada", resultado: pelicula}
            } else 
                respuesta   =   {error: true, codigo: 200,
                                mensaje: 'La película ya existe', resultado: pelicula};
            response.send(respuesta);
        }
        );

app.post("/pelicula/actor",
        function(request, response)
        {

            let actor = new Professional(request.body.name, request.body.age, request.body.genre, request.body.weightKg, request.body.heightCm, request.body.hairColor, request.body.eyeColor, request.body.race, request.body.isRetired, request.body.nationality, request.body.oscarsNumber, request.body.profession, request.body.picture);
            
            let respuesta   =   {error: false, codigo: 200, mensaje: "Actor creado", resultado: actor}
    
            actores.push(actor);
            response.send(respuesta);
        }
        );

app.post("/pelicula/director",
        function(request, response)
        {
            
            let respuesta;
            if (pelicula.director===null) {

            let director = new Professional(request.body.name, request.body.age, request.body.genre, request.body.weightKg, request.body.heightCm, request.body.hairColor, request.body.eyeColor, request.body.race, request.body.isRetired, request.body.nationality, request.body.oscarsNumber, request.body.profession, request.body.picture);
            pelicula.director = director;
            respuesta   =   {error: false, codigo: 200, mensaje: "Director creado", resultado: director}
            } else 
            respuesta   =   {error: true, codigo: 200,
                            mensaje: 'El director ya existe', resultado: pelicula.director};
            response.send(respuesta);
        }
        );

app.post("/pelicula/guionista",
        function(request, response)
        {
            let respuesta;
            if (guionista===null) {

            let guionista = new Professional(request.body.name, request.body.age, request.body.genre, request.body.weightKg, request.body.heightCm, request.body.hairColor, request.body.eyeColor, request.body.race, request.body.isRetired, request.body.nationality, request.body.oscarsNumber, request.body.profession, request.body.picture);
            
            respuesta   =   {error: false, codigo: 200,
                mensaje: "Guionista creado", resultado: JSON.stringify(guionista)}
            } else 
            respuesta   =   {error: true, codigo: 200,
                            mensaje: 'El guionista ya existe', resultado: JSON.stringify(guionista)};
            response.send(respuesta);
        }
        );

app.put("/pelicula",
        function(request, response)
        {
            let respuesta
            if (pelicula != null)
            {
                pelicula.title = request.body.title;
                pelicula.releaseYear = request.body.releaseYear;
                pelicula.actors = request.body.actors;
                pelicula.nationality = request.body.nationality;
                pelicula.director = request.body.director;
                pelicula.writer = request.body.writer;
                pelicula.genre = request.body.genre;
                pelicula.picture = request.body.picture;
             
                respuesta   =   {error: false, codigo: 200,
                mensaje: "Película actualizada", resultado: pelicula}
            } else 
                respuesta   =   {error: true, codigo: 200,
                                mensaje: 'La película no existe'};
            response.send(respuesta);
        });

app.put("/pelicula/actor",
        function(request, response)
        {
            pelicula.actors[request.body.id].name = request.body.name;
            pelicula.actors[request.body.id].age = request.body.age;
            pelicula.actors[request.body.id].genre = request.body.genre;
            pelicula.actors[request.body.id].weightKg = request.body.weightKg;
            pelicula.actors[request.body.id].heightCm = request.body.heightCm;
            pelicula.actors[request.body.id].hairColor = request.body.hairColor;
            pelicula.actors[request.body.id].eyeColor = request.body.eyeColor;
            pelicula.actors[request.body.id].race = request.body.race, 
            pelicula.actors[request.body.id].isRetired = request.body.isRetired;
            pelicula.actors[request.body.id].nationality = request.body.nationality;
            pelicula.actors[request.body.id].oscarNumber = request.body.oscarsNumber;
            pelicula.actors[request.body.id].profession = request.body.profession;
            pelicula.actors[request.body.id].picture =  request.body.picture;
            
            let respuesta   =   {error: false, codigo: 200, mensaje: "Actor actualizado", resultado: pelicula.actors[request.body.id]}
            response.send(respuesta)  
        });

app.put("/pelicula/director",
        function(request, response)
        {
            let respuesta
            if (pelicula.director != null)
            {
                pelicula.director.name = request.body.name;
                pelicula.director.age = request.body.age;
                pelicula.director.genre = request.body.genre;
                pelicula.director.weightKg = request.body.weightKg;
                pelicula.director.heightCm = request.body.heightCm;
                pelicula.director.hairColor = request.body.hairColor;
                pelicula.director.eyeColor = request.body.eyeColor;
                pelicula.director.race = request.body.race, 
                pelicula.director.isRetired = request.body.isRetired;
                pelicula.director.nationality = request.body.nationality;
                pelicula.director.oscarNumber = request.body.oscarsNumber;
                pelicula.director.profession = request.body.profession;
                pelicula.director.picture =  request.body.picture;
             
                respuesta   =   {error: false, codigo: 200, mensaje: "Director actualizado", resultado: pelicula.director}
            } else 
                respuesta   =   {error: true, codigo: 200, mensaje: 'El Director no existe'};
            response.send(respuesta);
        });

app.put("/pelicula/guionista",
        function(request, response)
        {
            let respuesta
            if (pelicula.guionista != null)
            {
                pelicula.guionista.name = request.body.name;
                pelicula.guionista.age = request.body.age;
                pelicula.guionista.genre = request.body.genre;
                pelicula.guionista.weightKg = request.body.weightKg;
                pelicula.guionista.heightCm = request.body.heightCm;
                pelicula.guionista.hairColor = request.body.hairColor;
                pelicula.guionista.eyeColor = request.body.eyeColor;
                pelicula.guionista.race = request.body.race, 
                pelicula.guionista.isRetired = request.body.isRetired;
                pelicula.guionista.nationality = request.body.nationality;
                pelicula.guionista.oscarNumber = request.body.oscarsNumber;
                pelicula.guionista.profession = request.body.profession;
                pelicula.guionista.picture =  request.body.picture;
             
                respuesta   =   {error: false, codigo: 200, mensaje: "Guionista actualizado", resultado: pelicula.guionista}
            } else 
                respuesta   =   {error: true, codigo: 200, mensaje: 'El Guionista no existe'};
            response.send(respuesta);
        });

app.delete("/pelicula",
        function(request, response)
        {
            let respuesta
            if (pelicula != null)
            {
                pelicula = null
                respuesta   =   {error: false, codigo: 200,
                        mensaje: "Película borrada"}
            } 
            else 
                respuesta   =   {error: true, codigo: 200,
                                mensaje: 'La película no existe'};
            response.send(respuesta);
        }
        );
app.delete("/pelicula/actor",
        function(request, response)
        {
            let respuesta
            if (pelicula.actors[request.body.id] != null)
            {
                pelicula.actors[request.body.id] = null
                respuesta   =   {error: false, codigo: 200, mensaje: "Actor borrado"}
            } 
            else 
                respuesta   =   {error: true, codigo: 200, mensaje: 'El actor no existe'};
            response.send(respuesta)  
        });

app.delete("/pelicula/director",
        function(request, response)
        {
            let respuesta
            if (pelicula.director != null)
            {
                pelicula.director = null
                respuesta   =   {error: false, codigo: 200, mensaje: "Director borrado"}
            } 
            else 
                respuesta   =   {error: true, codigo: 200, mensaje: 'El Director no existe'};
            response.send(respuesta);
        }
        );

app.delete("/pelicula/guionista",
        function(request, response)
        {
            let respuesta
            if (pelicula.guionista != null)
            {
                pelicula.guionista = null
                respuesta   =   {error: false, codigo: 200, mensaje: "Guionista borrado"}
            } 
            else 
                respuesta   =   {error: true, codigo: 200, mensaje: 'El Guionista no existe'};
            response.send(respuesta);
        }
        );

app.use(function(req,res,next)
        {
                respuesta = {error: true, codigo: 404, mensaje: 'URL no encontrada'};
                res.status(404).send(respuesta);
        }
        )
    
app.listen(3808);