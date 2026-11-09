"use strict"; // Mode strict (slide 52)

// Compteur de lignes insérées, initialisé à 0 (variable, slides 38 et 52)
let lignes = 0;

// Tableau d'objets "persons" (tableau d'objets, slides 40 et 41)
const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

// Appel de init() au chargement du script (script chargé avec defer, slide 28)
init();

// Parcourt persons et insère chaque personne
function init() {
    // Boucle for..of (slide 45) sur le tableau persons
    for (const person of persons) {
        // Accès aux propriétés d'un objet (slide 40)
        doInsert(person.nom, person.prenom, person.points);
    }
}

// Insère une personne en utilisant le compteur "lignes"
function doInsert(nom, prenom, points) {
    // Incrémenter lignes de 1 puis l'utiliser comme numéro de ligne
    lignes++;
    doInsertRowTable(lignes, nom, prenom, points);
}

// Affiche le contenu du tableau persons dans la console (slide 34)
function consoleTableau() {
    console.table(persons);
}

// Insère une ligne dans le tableau (Etape 2)
function doInsertRowTable(num, nom, prenom, points) {
    // Récupérer l'élément tableau (DOM : getElementById, slides 61-64)
    const table = document.getElementById("table_persons");

    // Créer un élément tr (DOM : createElement, slide 104)
    const row = document.createElement("tr");

    // Affecter la classe "row" avec setAttribute (DOM : setAttribute, slide 107)
    row.setAttribute("class", "row");

    // Créer 5 éléments td (une par colonne)
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    // Remplir le contenu des colonnes avec innerText (DOM : innerText, slide 91)
    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;

    // La dernière colonne contient un input de type checkbox
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    col5.append(checkbox);

    // Affecter les classes correspondantes à chaque colonne
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    // Rajouter les colonnes à la ligne avec append() (DOM : append, slide 98)
    row.append(col1, col2, col3, col4, col5);

    // Rajouter la ligne au tableau (append, slide 98)
    table.append(row);
}
