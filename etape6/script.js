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

function init() {
    // Boucle for..of (slide 45)
    for (const person of persons) {
        doInsert(person.nom, person.prenom, person.points);
    }
}

function doInsert(nom, prenom, points) {
    lignes++;
    total_points += points;
    doInsertRowTable(lignes, nom, prenom, points);
    update_summary();
}

function update_summary() {
    // Récupérer les éléments p1 et p3 (DOM : getElementById, slides 61-64)
    const element_lignes = document.getElementById("p1");
    const element_points = document.getElementById("p3");

    // Modifier le contenu avec innerText (DOM : innerText, slide 91)
    element_lignes.innerText = lignes + " ligne(s)";
    element_points.innerText = "Total point(s)= " + total_points;
}

function doNewData() {
    // Récupérer les champs de saisie (DOM : getElementById, slides 61-64)
    const elt_nom = document.getElementById("form_nom");
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");

    // Lire les valeurs saisies (propriété value d'un élément, slide 93)
    const nom = elt_nom.value;
    const prenom = elt_prenom.value;
    const points = parseInt(elt_points.value);

    // Contrôle de saisie : conditions if/else et opérateur || (slides 42 et 43)
    if (nom.trim() === "" || prenom.trim() === "" || Number.isNaN(points)) {
        // Message d'alerte (BOM : window.alert, slide 116)
        alert("Formulaire incomplet !");
    } else {
        doInsert(nom, prenom, points);

        // Insérer aussi dans le tableau d'objets persons (push, slide 39)
        persons.push({ nom: nom, prenom: prenom, points: points });

        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
    }
}

// Affiche le contenu du tableau persons dans la console (slide 34)
function consoleTableau() {
    console.table(persons);
}

function deleteRow() {
    // Etape 1 : tableau vide ? (condition, slide 43)
    if (lignes === 0) {
        alert("Le tableau est vide !");
        return;
    }

    // (DOM : querySelectorAll, slides 76-78)
    const table = document.querySelector("#table_persons");
    const cochees = table.querySelectorAll(".col_chkbox input:checked");

    if (cochees.length === 0) {
        alert("Sélectionnez au moins une ligne !");
        return;
    }

    // Etape 4 : demander confirmation (BOM : pop-ups de window, slide 116 ; confirm() n'est pas détaillée en cours)
    if (!confirm("Voulez-vous vraiment supprimer les lignes sélectionnées ?")) {
        return;
    }

    const rows = table.querySelectorAll(".row");

    for (let i = rows.length - 1; i >= 0; i--) {   // boucle for (slide 45)
        const row = rows[i];
        const checkbox = row.querySelector(".col_chkbox input");

        if (checkbox.checked) {
            // Points = contenu de la 4e cellule : propriété children (slide 89), index 3
            const points = parseInt(row.children[3].innerText);

            total_points -= points;   
            lignes--;                 
            row.remove();             // supprimer la ligne du DOM (remove, slide 100)
            persons.splice(i, 1);   
        }
    }

    alert("Suppression effectuée !");
    update_summary();
}

function editRow() {
    // Récupérer le tableau et les checkbox cochées (querySelectorAll, slides 76-78)
    const table = document.querySelector("#table_persons");
    const cochees = table.querySelectorAll(".col_chkbox input:checked");

    // Il faut exactement une ligne sélectionnée (condition, slide 43)
    if (cochees.length !== 1) {
        alert("Sélectionnez exactement une ligne à modifier !");
        return;
    }

    // Trouver l'index de la ligne cochée (boucle for, slide 45)
    const rows = table.querySelectorAll(".row");
    let index = -1;
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].querySelector(".col_chkbox input").checked) {
            index = i;
        }
    }
    const row = rows[index];
    const person = persons[index];  

    // Demander les nouvelles valeurs (BOM : prompt, slide 116)
    const nom = prompt("Nouveau nom :", person.nom);
    if (nom === null) return;
    const prenom = prompt("Nouveau prénom :", person.prenom);
    if (prenom === null) return;
    const saisiePoints = prompt("Nouveaux points :", person.points);
    if (saisiePoints === null) return;
    const points = parseInt(saisiePoints);

    // Contrôle de saisie (conditions et opérateur ||, slides 42 et 43)
    if (nom.trim() === "" || prenom.trim() === "" || Number.isNaN(points)) {
        alert("Formulaire incomplet !");
        return;
    }

    total_points = total_points - person.points + points;

    // Modifier l'objet dans persons (propriétés d'un objet, slide 40)
    person.nom = nom;
    person.prenom = prenom;
    person.points = points;

    // Modifier les cellules du DOM : children (slide 89) et innerText (slide 91)
    row.children[1].innerText = nom;
    row.children[2].innerText = prenom;
    row.children[3].innerText = points;

    update_summary();
}

function searchRow() {
    // Lire le texte recherché (propriété value, slide 93)
    const texte = document.getElementById("search_field").value.trim().toLowerCase();
    const rows = document.querySelectorAll("#table_persons .row");
    const element_resultat = document.getElementById("p2");   // zone libre du résumé
    let trouves = 0;

    // Parcourir les lignes avec une boucle for (slide 45)
    for (let i = 0; i < rows.length; i++) {
        const nom = persons[i].nom.toLowerCase();
        const prenom = persons[i].prenom.toLowerCase();

        if (texte !== "" && (nom.includes(texte) || prenom.includes(texte))) {
            rows[i].setAttribute("class", "row found");   // setAttribute, slide 107
            trouves++;
        } else {
            rows[i].setAttribute("class", "row");
        }
    }

    // Afficher le nombre de résultats dans p2 (innerText, slide 91)
    if (texte === "") {
        element_resultat.innerText = "";
    } else if (trouves === 0) {
        element_resultat.innerText = "Aucun résultat";
    } else {
        element_resultat.innerText = trouves + " résultat(s)";
    }
}

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

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    col5.append(checkbox);

    
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