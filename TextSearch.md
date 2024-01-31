# Text Search

MongoDB prend en charge les opérations de requête qui effectuent une recherche sémantique sur le contenu des chaînes de caractères. Pour effectuer une recherche textuelle, MongoDB utilise un index de texte et l'opérateur $text.

### Création d'un jeu d'essai

### Commandes:

use stores
db.stores.insertMany(
[
{_id: 1, name: "Java Hut", description: "Coffee and cakes"},
{_id: 2, name: "Burger Buns", description: "Gourmet hamburgers"},
{_id: 3, name: "Coffee Shop", description: "Just coffee"},
{_id: 4, name: "Clothes Clothes Clothes", description: "Discount clothing"},
{_id: 5, name: "Java Shopping", description: "Indonesian goods"}
]
)

### Création d'un index de texte

MongoDB fournit des index de texte afin de permettre d'effectuer des recherches semantiques sur le contenu des chaines de caracteres. Ces index peuvent inclure n'importe quel champ de type string ou array de string. Pour effectuer ce type de recherche, il faut créer un index de texte sur le champ de la collection. Une collection ne peut avoir qu'un seul index de texte, mais cet index peut inclure plusieurs champs. Par exemple, pour créer un index de texte sur les champs name et description de la collection stores, il faut utiliser la commande suivante:

db.stores.createIndex({ name: "text", description: "text" });

### L'operateur $text

Vous pouvez utiliser l'opérateur de recherche $text pour effectuer des recherches textuelles sur un champ indexé de type string ou array de string. Par exemple, pour rechercher les documents qui contiennent le mot "coffee" dans le champ name ou description, il faut utiliser la commande suivante:

db.stores.find({ $text: { $search: "coffee" } });

### Term Exclusion

Pour exclure un mot, vous pouvez le 'marquer' avec un signe - (moins). Par exemple, pour rechercher les documents qui contiennent le mot "coffee" dans le champ name ou description mais pas le mot "shop", il faut utiliser la commande suivante:

db.stores.find({ $text: { $search: "coffee -shop" } });

### Sort by Text Score

L'opérateur $text attribue un score à chaque document qui contient les termes de recherche. Le score représente la pertinence d'un document par rapport à la recherche. MongoDB retourne les documents triés par ordre décroissant du score de pertinence. Le score de pertinence est le nombre de fois que le terme de recherche apparaît dans le document. Afin de trier les résultats dans l'ordre du score de pertinence, vous devez explicitement projeter le champ $meta:textScore et utiliser la méthode sort().

```js
db.stores
  .find(
    { $text: { $search: "java coffee shop" } },
    { score: { $meta: "textScore" } }
  )
  .sort({ score: { $meta: "textScore" } });
```

#### creer un index de text sur les champs summary, description et name

```js
db.Reviews.createIndex({ summary: "text", description: "text", name: "text" });
```

#### Lister tous les appartements contenant le terme duplex

```js
db.Reviews.find({ $text: { $search: "duplex" } });
```

#### Compter le nombre d'appartements qui possède un lit king size

```js
db.Reviews.find({ $text: { $search: '"king size"' } }).count();
```

#### Compter combien d'appartements ont pour description cozy, studio mais pas furnish (a partir de cette etape supprimez l'index et le placer uniquement sur la description)

```js
db.Reviews.find({ $text: { $search: "cozy studio -furnish" } }).count();
```
