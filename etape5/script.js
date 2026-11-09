"use strict"; // Mode strict (slide 52)

// Compteur de lignes et total des points (variables, slides 38 et 52)
let lignes = 0;
let total_points = 0;

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
    // Boucle for..of (slide 45)
    for (const person of persons) {
        doInsert(person.nom, person.prenom, person.points);
    }
}

// Insère une personne et met à jour les compteurs et le résumé
function doInsert(nom, prenom, points) {
    lignes++;
    total_points += points;
    doInsertRowTable(lignes, nom, prenom, points);
    update_summary();
}

// Met à jour l'espace résumé
function update_summary() {
    // Récupérer les éléments p1 et p3 (DOM : getElementById, slides 61-64)
    const element_lignes = document.getElementById("p1");
    const element_points = document.getElementById("p3");

    // Modifier le contenu avec innerText (DOM : innerText, slide 91)
    element_lignes.innerText = lignes + " ligne(s)";
    element_points.innerText = "Total point(s)= " + total_points;
}

// Lit le formulaire, contrôle la saisie, puis insère la personne
function doNewData() {
    // Récupérer les champs de saisie (DOM : getElementById, slides 61-64)
    const elt_nom = document.getElementById("form_nom");
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");

    // Lire les valeurs saisies (propriété value d'un élément, slide 93)
    const nom = elt_nom.value;
    const prenom = elt_prenom.value;
    // parseInt convertit le texte en entier
    const points = parseInt(elt_points.value);

    // Contrôle de saisie : conditions if/else et opérateur || (slides 42 et 43)
    if (nom.trim() === "" || prenom.trim() === "" || Number.isNaN(points)) {
        // Message d'alerte (BOM : window.alert, slide 116)
        alert("Formulaire incomplet !");
    } else {
        // Insérer dans le tableau HTML
        doInsert(nom, prenom, points);

        // Insérer aussi dans le tableau d'objets persons (push, slide 39)
        persons.push({ nom: nom, prenom: prenom, points: points });

        // Vider les champs pour une autre saisie
        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
    }
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
