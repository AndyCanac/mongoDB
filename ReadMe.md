# Mongo DB

Mango DB est un systeme de base de donnée NoSQL orienté document.

Les index permette d'accelerer la lecture de donnée dans une base mais ralentis la modification de celle-ci.

Pas de schema precis donc très libre mais risque de trainée des erreur sans s'en rendre compte

# Exercice ExoBook :

#### Créer une base de donnée :

`use sample_db;`

#### Créer une collection :

`db.createCollection("employees");`

#### Inserer des donnée dans une collection :

`db.employees.insert({ name: "John Doe", age: 35, job: "Manager", salary: 80000 });`

`db.employees.insert({ name: "Jane Doe", age: 32, job: "Developer", salary: 75000 });`

`db.employees.insert({ name: "Jim Smith", age: 40, job: "Manager", salary: 85000 });`

#### Trouver tous les documents dans la collection "employees" :

`db.employees.find({});`

#### Trouver tous les documents où l'âge est supérieur à 33 :

`db.employees.find({ age: { $gt: 33 } });`

#### Trier les documents dans la collection "employees" par salaire décroissant :

`db.employees.find({}).sort({ salary: -1 });`

#### Requête pour sélectionner uniquement le nom et le job de chaque document :

`db.employees.find({}, { name: true, job: true, \_id: false });`

#### Requête pour compter le nombre d'employés par poste :

`db.employees.aggregate([{ $group: { _id: "$job", count: { $sum: 1 } } }]);`

#### Requête pour mettre à jour le salaire de tous les développeurs à 80000 :

`db.employees.update({ job: "Developer" }, { $set: { salary: 80000 }});`

---

# Exercice Book :

```json
db.salles.insertMany([
{
"\_id": 1,
"nom": "AJMI Jazz Club",
"adresse": {
"numero": 4,
"voie": "Rue des Escaliers Sainte-Anne",
"codePostal": "84000",
"ville": "Avignon",
"localisation": {
"type": "Point",
"coordinates": [43.951616, 4.808657]
}
},
"styles": ["jazz", "soul", "funk", "blues"],
"avis": [{
"date": new Date('2019-11-01'),
"note": NumberInt(8)
},
{
"date": new Date('2019-11-30'),
"note": NumberInt(9)
}
],
"capacite": NumberInt(300),
"smac": true
}, {
"\_id": 2,
"nom": "Paloma",
"adresse": {
"numero": 250,
"voie": "Chemin de l'Aérodrome",
"codePostal": "30000",
"ville": "Nîmes",
"localisation": {
"type": "Point",
"coordinates": [43.856430, 4.405415]
}
},
"avis": [{
"date": new Date('2019-07-06'),
"note": NumberInt(10)
}
],
"capacite": NumberInt(4000),
"smac": true
},
{
"\_id": 3,
"nom": "Sonograf",
"adresse": {
"voie": "D901",
"codePostal": "84250",
"ville": "Le Thor",
"localisation": {
"type": "Point",
"coordinates": [43.923005, 5.020077]
}
},
"capacite": NumberInt(200),
"styles": ["blues", "rock"]
}
])
```

#### Affichez l’identifiant et le nom des salles qui sont des SMAC :

`db.salles.find({smac: true}, {nom: true})`

#### Affichez le nom des salles qui possèdent une capacité d’accueil strictement supérieure à 1000 places :

`db.salles.find({capacite: {$gt: 1000}}, {nom: true})`

#### Affichez l’identifiant des salles pour lesquelles le champ adresse ne comporte pas de numéro :

`db.salles.find({"adresse.numero": {$exists: false}}, {_id: true})`

#### Affichez l’identifiant puis le nom des salles qui ont exactement un avis :

`db.salles.find({avis: {$size: 1}}, {nom: true})`

#### Affichez tous les styles musicaux des salles qui programment notamment du blues :

`db.salles.find({styles: "blues"}, {styles: true})`

#### Affichez tous les styles musicaux des salles qui ont le style « blues » en première position dans leur tableau styles :

`db.salles.find({"styles.0": "blues"}, {styles:true})`

#### Affichez la ville des salles dont le code postal commence par 84 et qui ont une capacité strictement inférieure à 500 places (pensez à utiliser une expression régulière) :


`db.salles.find({$and: [{"adresse.codePostal": /^84/}, {capacite: {$lt: 500}}]}, {"adresse.ville": true})`

#### Affichez l’identifiant pour les salles dont l’identifiant est pair ou le champ avis est absent.

`db.salles.find({$or: [{_id: {$mod: [2, 0]}}, {avis: {$exists: false}}]}, {_id: true})`

#### Affichez le nom des salles dont au moins un des avis comporte une note comprise entre 8 et 10 (tous deux inclus).

`db.salles.find({"avis.note": {$gte: 8, $lte: 10}}, {nom: true})`

#### Affichez le nom des salles dont au moins un des avis comporte une date postérieure au 15/11/2019 (pensez à utiliser le type JavaScript Date).

`db.salles.find({"avis.date": {$gt: new Date('2019-11-15')}}, {nom: true})`

#### Affichez le nom ainsi que la capacité des salles dont le produit de la valeur de l’identifiant par 100 est strictement supérieur à la capacité.

`db.salles.find({$expr: {$gt: [{$multiply: ["$_id", 100]}, "$capacite"]}}, {nom: true, capacite: true})`

#### Affichez le nom ainsi que la capacité des salles dont le produit de la valeur de l’identifiant par 100 est strictement supérieur à la capacité.

`db.salles.find({$expr: {$gt: [{$multiply: ["$_id", 100]}, "$capacite"]}}, {nom: true, capacite: true})`

#### Affichez le nom des salles de type SMAC programmant plus de deux styles de musiques différents en utilisant l’opérateur $where qui permet de faire usage de JavaScript.

`je sais pas`

#### Affichez les différents codes postaux présents dans les documents de la collection salles.

`db.salles.distinct("adresse.codePostal")`

#### Mettez à jour tous les documents de la collection salles en rajoutant 100 personnes à leur capacité actuelle.

`db.salles.updateMany({}, {$inc: {capacite: 100}})`

#### Ajoutez le style « jazz » à toutes les salles qui n’en programment pas.

`db.salles.updateMany({styles: {$ne: "jazz"}}, {$push: {styles: "jazz"}})`

#### Retirez le style «funk» à toutes les salles dont l’identifiant n’est égal ni à 2, ni à 3.

`db.salles.updateMany({_id: {$nin: [2, 3]}}, {$pull: {styles: "funk"}})`

#### Ajoutez un tableau composé des styles «techno» et « reggae » à la salle dont l’identifiant est 3.

`db.salles.updateOne({_id: 3}, {$push: {styles: {$each: ["techno", "reggae"]}}})`

#### Pour les salles dont le nom commence par la lettre P (majuscule ou minuscule), augmentez la capacité de 150 places et rajoutez un champ de type tableau nommé contact dans lequel se trouvera un document comportant un champ nommé telephone dont la valeur sera « 04 11 94 00 10 ».

`db.salles.updateMany({nom: /^P/i}, {$inc: {capacite: 150}, $push: {contact: {telephone: "04 11 94 00 10"}}})`

#### Pour les salles dont le nom commence par une voyelle (peu importe la casse, là aussi), rajoutez dans le tableau avis un document composé du champ date valant la date courante et du champ note valant 10 (double ou entier). L’expression régulière pour chercher une chaîne de caractères débutant par une voyelle suivie de n’importe quoi d’autre est \b[aeiouyAEIOUY]\w*.

`db.salles.updateMany({nom:/\b[aeiouyAEIOUY]/},{$push: {avis:{date: new Date(), note:10}}})`

#### En mode upsert, vous mettrez à jour tous les documents dont le nom commence par un z ou un Z en leur affectant comme nom « Pub Z », comme valeur du champ capacite 50 personnes (type entier et non décimal) et en positionnant le champ booléen smac à la valeur « false ».

