const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Grupo-19:grupo19@cursadanodejs.ls9ii.mongodb.net/Node-js')
    .then(() => console.log('Conexion exitosa a MongoDB'))
    .catch(error => console.error('error al conectar a MongoDB', error));


const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: {type: String, required: true},
    nombreReal: {type: String, required: true},
    edad: {type: Number, min:0 },
    planetaOrigen: {type: String, default: 'Desconocido'},
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: {type: Date, default: Date.now},
    creador: String 
} , { collection: 'Grupo-19' });

const superHero = mongoose.model('superhero', superheroSchema);


// insertar 

async function insertSuperHero() {
    const hero = new superHero ({
        nombreSuperHeroe: 'Spiderman',
        nombreReal: 'Peter Parker',
        edad: 25,
        planetaOrigen: 'Tierra',
        debilidad: 'Radiactiva',
        poderes: ['Trepar paredes', 'Sentido aracnido', 'Super fuerza', 'Agilidad'],
        aliados: ['Iron Man', 'Hulk', 'Wolverine', 'Captain America'],
        enemigos: ['Duende verde'],
        creador: 'Sofia Luciana Aguero'

    });
    await hero.save();
    console.log('Superheroe Insertado', hero);
}

insertSuperHero();


// actualizar

async function updateSuperHero(nombreSuperHeroe) {
    const result = await superHero.updateOne(
        { nombreSuperHeroe: nombreSuperHeroe },
        { $set: {edad:27}}
    );
    console.log('Resultado de la actualizacion: ', result);
}

updateSuperHero('Spiderman');



// eliminar

async function deleteSuperHero(nombreSuperHeroe) {
    const result = await superHero.deleteOne(
        { nombreSuperHeroe: nombreSuperHeroe });
        console.log('SuperHeroe eliminado: ', result);
}

deleteSuperHero('Spiderman');


// buscar documentos

async function findSuperHeroes() {
    const heroes = await superHero.find({planetaOrigen: 'Tierra'});
    console.log('Heroes encontrados: ', heroes);
}

findSuperHeroes();
