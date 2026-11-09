"use strict"; // Mode strict (slide 52)


function doInsertRowTable(num, nom, prenom, points) {
    // Récupérer l'élément tableau (DOM : getElementById, slides 61-64)
    const table = document.getElementById("table_persons");

    // Créer un élément tr (DOM : createElement, slide 104)
    const row = document.createElement("tr");

    // Affecter la classe "row" avec setAttribute (DOM : setAttribute, slide 107)
    row.setAttribute("class", "row");

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
