# Mongo DB

Mango DB est un systeme de base de donnée NoSQL orienté document.

Les index permette d'accelerer la lecture de donnée dans une base mais ralentis la modification de celle-ci.

Pas de schema precis donc très libre mais risque de trainée des erreur sans s'en rendre compte

# Exercice ExoBook :

#### Créer une base de donnée :

```js
use sample_db;
```

#### Créer une collection :

```js
db.createCollection("employees");
```

#### Inserer des donnée dans une collection :

```js
db.employees.insert({
  name: "John Doe",
  age: 35,
  job: "Manager",
  salary: 80000,
});
```

```js
db.employees.insert({
  name: "Jane Doe",
  age: 32,
  job: "Developer",
  salary: 75000,
});
```

```js
db.employees.insert({
  name: "Jim Smith",
  age: 40,
  job: "Manager",
  salary: 85000,
});
```

#### Trouver tous les documents dans la collection "employees" :

```js
db.employees.find({});
```

#### Trouver tous les documents où l'âge est supérieur à 33 :

```js
db.employees.find({ age: { $gt: 33 } });
```

#### Trier les documents dans la collection "employees" par salaire décroissant :

```js
db.employees.find({}).sort({ salary: -1 });
```

#### Requête pour sélectionner uniquement le nom et le job de chaque document :

```js
db.employees.find({}, { name: true, job: true, \_id: false });
```

#### Requête pour compter le nombre d'employés par poste :

```js
db.employees.aggregate([{ $group: { _id: "$job", count: { $sum: 1 } } }]);
```

#### Requête pour mettre à jour le salaire de tous les développeurs à 80000 :

```js
db.employees.update({ job: "Developer" }, { $set: { salary: 80000 } });
```

---

# Exercice Book :

```js
db.salles.insertMany([
  {
    "_id": 1,
    nom: "AJMI Jazz Club",
    adresse: {
      numero: 4,
      voie: "Rue des Escaliers Sainte-Anne",
      codePostal: "84000",
      ville: "Avignon",
      localisation: {
        type: "Point",
        coordinates: [43.951616, 4.808657],
      },
    },
    styles: ["jazz", "soul", "funk", "blues"],
    avis: [
      {
        date: new Date("2019-11-01"),
        note: NumberInt(8),
      },
      {
        date: new Date("2019-11-30"),
        note: NumberInt(9),
      },
    ],
    capacite: NumberInt(300),
    smac: true,
  },
  {
    "_id": 2,
    nom: "Paloma",
    adresse: {
      numero: 250,
      voie: "Chemin de l'Aérodrome",
      codePostal: "30000",
      ville: "Nîmes",
      localisation: {
        type: "Point",
        coordinates: [43.85643, 4.405415],
      },
    },
    avis: [
      {
        date: new Date("2019-07-06"),
        note: NumberInt(10),
      },
    ],
    capacite: NumberInt(4000),
    smac: true,
  },
  {
    "_id": 3,
    nom: "Sonograf",
    adresse: {
      voie: "D901",
      codePostal: "84250",
      ville: "Le Thor",
      localisation: {
        type: "Point",
        coordinates: [43.923005, 5.020077],
      },
    },
    capacite: NumberInt(200),
    styles: ["blues", "rock"],
  },
]);
```

#### Affichez l’identifiant et le nom des salles qui sont des SMAC :

```js
db.salles.find({ smac: true }, { nom: true });
```

#### Affichez le nom des salles qui possèdent une capacité d’accueil strictement supérieure à 1000 places :

```js
db.salles.find({ capacite: { $gt: 1000 } }, { nom: true });
```

#### Affichez l’identifiant des salles pour lesquelles le champ adresse ne comporte pas de numéro :

```js
db.salles.find({ "adresse.numero": { $exists: false } }, { _id: true });
```

#### Affichez l’identifiant puis le nom des salles qui ont exactement un avis :

```js
db.salles.find({ avis: { $size: 1 } }, { nom: true });
```

#### Affichez tous les styles musicaux des salles qui programment notamment du blues :

```js
db.salles.find({ styles: "blues" }, { styles: true });
```

#### Affichez tous les styles musicaux des salles qui ont le style « blues » en première position dans leur tableau styles :

```js
db.salles.find({ "styles.0": "blues" }, { styles: true });
```

#### Affichez la ville des salles dont le code postal commence par 84 et qui ont une capacité strictement inférieure à 500 places (pensez à utiliser une expression régulière) :

```js
db.salles.find(
  { $and: [{ "adresse.codePostal": /^84/ }, { capacite: { $lt: 500 } }] },
  { "adresse.ville": true }
);
```

#### Affichez l’identifiant pour les salles dont l’identifiant est pair ou le champ avis est absent.

```js
db.salles.find(
  { $or: [{ _id: { $mod: [2, 0] } }, { avis: { $exists: false } }] },
  { _id: true }
);
```

#### Affichez le nom des salles dont au moins un des avis comporte une note comprise entre 8 et 10 (tous deux inclus).

```js
db.salles.find({ "avis.note": { $gte: 8, $lte: 10 } }, { nom: true });
```

#### Affichez le nom des salles dont au moins un des avis comporte une date postérieure au 15/11/2019 (pensez à utiliser le type JavaScript Date).

```js
db.salles.find({ "avis.date": { $gt: new Date("2019-11-15") } }, { nom: true });
```

#### Affichez le nom ainsi que la capacité des salles dont le produit de la valeur de l’identifiant par 100 est strictement supérieur à la capacité.

```js
db.salles.find(
  { $expr: { $gt: [{ $multiply: ["$_id", 100] }, "$capacite"] } },
  { nom: true, capacite: true }
);
```

#### Affichez le nom ainsi que la capacité des salles dont le produit de la valeur de l’identifiant par 100 est strictement supérieur à la capacité.

```js
db.salles.find(
  { $expr: { $gt: [{ $multiply: ["$_id", 100] }, "$capacite"] } },
  { nom: true, capacite: true }
);
```

#### Affichez le nom des salles de type SMAC programmant plus de deux styles de musiques différents en utilisant l’opérateur $where qui permet de faire usage de JavaScript.

```js
je sais pas
```

#### Affichez les différents codes postaux présents dans les documents de la collection salles.

```js
db.salles.distinct("adresse.codePostal");
```

#### Mettez à jour tous les documents de la collection salles en rajoutant 100 personnes à leur capacité actuelle.

```js
db.salles.updateMany({}, { $inc: { capacite: 100 } });
```

#### Ajoutez le style « jazz » à toutes les salles qui n’en programment pas.

```js
db.salles.updateMany(
  { styles: { $ne: "jazz" } },
  { $push: { styles: "jazz" } }
);
```

#### Retirez le style «funk» à toutes les salles dont l’identifiant n’est égal ni à 2, ni à 3.

```js
db.salles.updateMany({ _id: { $nin: [2, 3] } }, { $pull: { styles: "funk" } });
```

#### Ajoutez un tableau composé des styles «techno» et « reggae » à la salle dont l’identifiant est 3.

```js
db.salles.updateOne(
  { _id: 3 },
  { $addtoset: { styles: { $each: ["techno", "reggae"] } } }
);
```

#### Pour les salles dont le nom commence par la lettre P (majuscule ou minuscule), augmentez la capacité de 150 places et rajoutez un champ de type tableau nommé contact dans lequel se trouvera un document comportant un champ nommé telephone dont la valeur sera « 04 11 94 00 10 ».

```js
db.salles.updateMany(
  { nom: /^P/i },
  {
    $inc: { capacite: 150 },
    $push: { contact: { telephone: "04 11 94 00 10" } },
  }
);
```

#### Pour les salles dont le nom commence par une voyelle (peu importe la casse, là aussi), rajoutez dans le tableau avis un document composé du champ date valant la date courante et du champ note valant 10 (double ou entier). L’expression régulière pour chercher une chaîne de caractères débutant par une voyelle suivie de n’importe quoi d’autre est \b[aeiouyAEIOUY]\w\*.

```js
db.salles.updateMany(
  { nom: /\b[aeiouyAEIOUY]/ },
  { $push: { avis: { date: new Date(), note: 10 } } }
);
```

#### En mode upsert, vous mettrez à jour tous les documents dont le nom commence par un z ou un Z en leur affectant comme nom « Pub Z », comme valeur du champ capacite 50 personnes (type entier et non décimal) et en positionnant le champ booléen smac à la valeur « false ».

```js
db.salles.updateMany(
  { nom: /^z/i },
  { $set: { nom: "Pub Z", capacite: 50, smac: false } },
  { upsert: true }
);
```

#### Affichez le décompte des documents pour lesquels le champ \_id est de type « objectId ».

```js
db.salles.countDocuments({ _id: { $type: "objectId" } });
```

#### Pour les documents dont le champ \_id n’est pas de type « objectId », affichez le nom de la salle ayant la plus grande capacité. Pour y parvenir, vous effectuerez un tri dans l’ordre qui convient tout en limitant le nombre de documents affichés pour ne retourner que celui qui comporte la capacité maximale.

```js
db.salles
  .find({ _id: { $not: { $type: "objectId" } } }, { nom: true, capacite: true })
  .sort({ capacite: -1 })
  .limit(1);
```

#### Remplacez, sur la base de la valeur de son champ \_id, le document créé à l’exercice 20 par un document contenant seulement le nom préexistant et la capacité, que vous monterez à 60 personnes.

```js
db.salles.replaceOne({ $type: "objectId" }, { nom: "Pub Z", capacite: 60 });
```

#### Effectuez la suppression d’un seul document avec les critères suivants : le champ \_id est de type « objectId » et la capacité de la salle est inférieure ou égale à 60 personnes.

```js
db.salles.deleteOne({ _id: { $type: "objectId" }, capacite: { $lte: 60 } });
```

#### À l’aide de la méthode permettant de trouver un seul document et de le mettre à jour en même temps, réduisez de 15 personnes la capacité de la salle située à Nîmes.

```js
db.salles.findOneAndUpdate({ nom: "Paloma" }, { $inc: { capacite: -15 } });
```

# Docker

Pour lancer mongo avec docker :

```bash
docker pull mongo # recupere image docker

docker run -d -p 27017:27017 --name mongodb mongo # lance un container mongo

docker exec -it mongo /bin/bash # se connecte au container mongo

mongosh # se connecte a mongo
```

````bash

import csv file in mongo db :

```bash
mongoimport --db crash --collection crashcollection --type csv --headerline --file crash.csv
````

copy file in docker :

```bash
docker cp crash.csv mongodb:/crash.csv
```

### Restaurant Question :

récupérez la liste des restaurants ayant un grade inférieur à un score de 10 (Afficher cette liste sous forme de projection {name, grades.scores})

```js
db.restaurantcollection.find(
  { "grades.score": { $lt: 10 } },
  { name: true, "grades.score": true }
);
```

Afficher la liste des restaurant qui possede tout leur grades inferieur a 10

```js
a faire
```

# les requetes GeoSpatial

## Pre requis : les indexes

un index est une structure de données qui stockent une petite partie des données de la collection. Cela permet d'accelerer les requetes. Les indexes ameliorent aussi les performances des requetes de tri et de regroupement.

Pour creer un index :

```bash
db.collection.createIndex({"<champ>" : "<type d\'index>"})
```

Pour lister les indexes d'une collection :

```bash
db.collection.getIndexes()
```

Pour supprimer un index :

```bash
db.collection.dropIndex({"<champ>":"<type d\'index>"})
```

## Les requetes GeoSpatial

### Le standard GeoJSON

GEOJson est un format open source pour representer des données geographique. Il est basé sur le format JSON. Il permet de representer des points, des lignes, des polygones, des multi points, des multi lignes, des multi polygones et des geometries geometriques.

plus d'information sur le site : https://geojson.org/

### Les indexes geospatiaux

MongoDB vous propose des index geospatiaux pour ameliorer les performances des requetes geospatiales. Il existe deux type d"index geospatiaux : Les index 2d et les index 2dsphere.

```sh
db.collection.createIndex({"geodata":"2d"}) # pour un index 2d
```

#### Les index 2d

Ils utilisent des couples de coordonnées appelés `legacy`. Les index 2d ne prennent pas en charge les sphères et les calculs de distance sur une sphere. Ils ne prennent pas en charge les index sur plusieurs champs.

Exemple d'insertion de données :

```sh
db.collection.insert({name: "Paris", geodata: [48.8566, 2.3522]})
```

On peux aussi stocket des coordonnées avec des index2d :

```js
db.plan.insert({ name: "Paris", geodata: [48.8566, 2.3522] });
```

ou

```js
db.plan.insert({
  nom: "point",
  geodata: [(lon: 48.8566), (lat: 2.3522)],
});
```

## Les objet GeoJSON

Voici la structure d'un objet GeoJSON :

```js
{
    "type": "Point",
    "coordinates": [48.8566, 2.3522]
}
```

et la structure generique :

```js
{
    "type": "<type de geometrie>",
    "coordinates": <coordonnées>
}
```

### L'oparateur $nearSphere

L'oparateur $nearSphere permet de trouver les documents les plus proches d'un point donné. Il prend en parametre un objet GeoJSON et une distance max en metre.

```js
$nearSphere: {
    $geometry: {
        type: "Point",
        coordinates: [48.8566, 2.3522]
    },
    $maxDistance: 1000,
    $minDistance: 500
}
```

### Exo Geo

##### Question 1

```js
var KilometresEnRadians = function(kilometres) {
    var rayonTerrestreEnKm = 6371;
    return kilometres / rayonTerrestreEnKm;
};

var salle = db.salles.findOne({"adresse.ville": "Nîmes"});

var requete = { 
    "adresse.localisation": { 
        $geoWithin: { 
            $centerSphere: {
                type : "Point",
                coordinates : [
                    salle.adresse.localisation.coordinates,
                    KilometresEnRadians(60)
                ]
            }
        }
    },
    "styles": { 
        $in: [
            "blues",
            "soul"
        ]
    }
};

db.salles.find(requete, {nom: true});
```

##### Question 2


Écrivez la requête qui permet d’obtenir la ville des salles situées dans un rayon de 100 kilomètres autour de Marseille, triées de la plus proche à la plus lointaine :

```js
var marseille = {"type": "Point", "coordinates": [43.300000, 5.400000]}
db.salles.find({"adresse.localisation": {$nearSphere: {$geometry: marseille, $maxDistance: 100000}}}, {"adresse.ville": true, _id: false}).sort({"adresse.localisation": 1})
```

Soit un objet GeoJSON de la forme suivante :
Donnez le nom des salles qui résident à l’intérieur.

```js
var polygone = {
  type: "Polygon",
  coordinates: [
    [
      [43.94899, 4.80908],
      [43.95292, 4.80929],
      [43.95174, 4.8056],
      [43.94899, 4.80908],
    ],
  ],
};

db.salles.find({ "adresse.localisation": { $geoIntersects: { $geometry: polygone } } }, { nom: true, _id: false });
```

Télécharger les jeux d'essais suivants : https://raw.githubusercontent.com/mongodb/docs-assets/geospatial/restaurants.json https://raw.githubusercontent.com/mongodb/docs-assets/geospatial/neighborhoods.json

Creation d'un index 2dsphere Un index géospatial, et améliore presque toujours les performances des requêtes $geoWithin et $geoIntersects. Comme ces données sont géographiques, créez un index2dsphère sur chaque collection en utilisant le shell mongo :

Attention, la création d'un index est OBLIGATOIRE pour permettre l'utilisation des arguments :$geoIntersects, $geoSphere, $geoNear, $geoWithin, $centerSphere, $nearSphere , etc...

Explorez les données, documentez votre démarche et vos résultats dans un fichier geo_exo_suite_suite.md

Trouvez la commande qui va retourner le restaurant Riviera Caterer... De quel type d'ojet GeoJSON s'agit-il ?

Trouvez "Hell's kitchen" au sein de la collection "neighborhoods" et retournez le nom du quartier, sa superficie et sa population. Quelle est la superficie totale de ce quartier ?

Trouvez la requete type qui permet de recuperer le nom du quartier a partir d'un point donné.

Trouver la requete qui trouve les restaurants dans un rayon donné (8km par exemple)

```js
db.restaurants.createIndex({geometry: "2dsphere"})
db.neighborhoods.createIndex({location: "2dsphere"})
```

```js
db.restaurants.find({"name": "Riviera Caterer"})
```

```js
{
    _id: ObjectId("5f9b3b3c2c9d3b0b3c9d3b0b"),
    "location": {
        "type": "Point",
        "coordinates": [
            -73.98241999999999,
            40.579505
        ]
    },
    name: "Riviera Caterer",
}
```

```js 
{
    geometry:{
        type: "Polygon",
        coordinates: [
            [
                [-73.98241999999999, 40.579505],
                [-73.983994, 40.577726],
                [-73.98510000000001, 40.578187],
                [-73.983482, 40.579927],
                [-73.98241999999999, 40.579505]
            ]
        ]
    },
    name: "Hell's Kitchen",
}
```

```js

db.neghbordhoods.findOne({
    geometry: {
        $geoIntersects: {
            $geometry: {
                type: "Point",
                coordinates: [-73.98241999999999, 40.579505]
            }
        }
    }
    name: true, id: false
})

```

```js
db.restaurants.find({
    location:{
        $geoWithin: {
            $centerSphere: [
                [-73.98241999999999, 40.579505],
                8/6378.1
            ]
        }
    }
})