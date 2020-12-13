/*4.------------------Conjunto de Películas------------------*/
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

let peliculas = new Array();


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

            if(peliculas[request.query.id] != null) {
            response.send (peliculas[request.query.id])
            } else { response.send ("La película no existe")
            }
            
        }
        );

app.post("/pelicula",-
        function(request, response)
        {
            let respuesta;
          
            let pelicula = new Movie(request.body.title,request.body.releaseYear, request.body.actors, request.body.nationality, request.body.director, request.body.writer, request.body.genre, request.body.picture);
            peliculas.push(pelicula);
            respuesta   =   {error: false, codigo: 200,
                            mensaje: "Película creada", resultado: pelicula}
            response.send(respuesta);
        }
        );

app.put("/pelicula",
        function(request, response)
        {
            let respuesta
            if (peliculas[request.query.id] != null)
            {
                peliculas[request.query.id].title = request.body.title;
                peliculas[request.query.id].releaseYear = request.body.releaseYear;
                peliculas[request.query.id].actors = request.body.actors;
                peliculas[request.query.id].nationality = request.body.nationality;
                peliculas[request.query.id].director = request.body.director;
                peliculas[request.query.id].writer = request.body.writer;
                peliculas[request.query.id].genre = request.body.genre;
                peliculas[request.query.id].picture = request.body.picture;
             
                respuesta   =   {error: false, codigo: 200,
                mensaje: "Película actualizada", resultado: peliculas[request.query.id]}
            } else 
                respuesta   =   {error: true, codigo: 200,
                                mensaje: 'La película no existe'};
            response.send(respuesta);
        });


app.delete("/pelicula",
        function(request, response)
        {
            let respuesta
            if (peliculas[request.query.id] != null)
            {
                peliculas[request.query.id] = null
                respuesta   =   {error: false, codigo: 200, mensaje: "Película borrada"}
            } 
            else 
                respuesta   =   {error: true, codigo: 200, mensaje: 'La película no existe'};
            response.send(respuesta);
        }
        );

app.use(function(req,res,next)
        {
                respuesta = {error: true, codigo: 404, mensaje: 'URL no encontrada'};
                res.status(404).send(respuesta);
        }
        )
    
app.listen(3900);