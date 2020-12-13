
/*2. -----------------------------Película----------------------------*/

class Movie {
    constructor (title, releaseYear, actors, nationality, director, writer, genre, picture) {
        this.title = title;
        this.releaseYear = releaseYear;
        this.actors = actors;
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
        let respuesta;
        if (pelicula !=null)
        respuesta = pelicula;
        else
            respuesta = {error: true, codigo: 200, mensaje: "La película no existe"}

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
                                mensaje: "Película creada", resultado: JSON.stringify(pelicula)}
            } else 
                respuesta   =   {error: true, codigo: 200,
                                mensaje: 'La película ya existe', resultado: JSON.stringify(pelicula)};
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
                                mensaje: 'La película no existe', resultado: pelicula};
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
                        mensaje: "Película borrada", resultado: pelicula}
            } 
            else 
                respuesta   =   {error: true, codigo: 200,
                                mensaje: 'La película no existe'};
            response.send(respuesta);
        }
        );
app.use(function(req,res,next)
        {
            respuesta = {error: true, codigo: 404, mensaje: 'URL no encontrada'};
            res.status(404).send(respuesta);
        })

app.listen(3800);