

 const cardsPage = 7;
 let currentPage = 1;
 let xmlDoc;

 
 function loadCards() {
     const xmlhttp = new XMLHttpRequest();
     console.log(xmlhttp.responseText);
     xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            xmlDoc = xmlhttp.responseXML; 
             tableauBiens();
             supprimerLigne();
         }
     };
     xmlhttp.open("GET","bdd/bdd.xml", true);
     xmlhttp.send();
 }

 function ajoutLigne(){
    var table=document.getElementById("data");
    var newLigne= table.insertRow(table.rows.length);

    var ID= newLigne.insertCell(0)
    ID.innerHTML ="Nouvel ID";
    var BIEN= newLigne.insertCell(1)
    BIEN.innerHTML ="Type de bien";
    var SURFACE= newLigne.insertCell(2)
    SURFACE.innerHTML ="suface en m2";
    var NBPIECE= newLigne.insertCell(3)
    NBPIECE.innerHTML ="Nb de pieces";
    var PRIX= newLigne.insertCell(4)
    PRIX.innerHTML ="prix";
    var CHAUFFAGE= newLigne.insertCell(5)
    CHAUFFAGE.innerHTML ="type de chauffage";
    var LOCALISATION= newLigne.insertCell(6)
    LOCALISATION.innerHTML ="ville";

    var newSupp = newLigne.insertCell(-1);
    newSupp.innerHTML = '<button class="btn btn-outline-dark" onclick="supprimerLigne(this)">Supprimer</button>';


}


function supprimerLigne(button) {
    var ligne = button.parentNode.parentNode;
    var table=document.getElementById("data");
    table.deleteRow(ligne.rowIndex);
    
}

function tableauBiens(){
    let i;
    let table = "<tr><th>ID</th><th>BIEN</th><th>SURFACE</th><th>NBPIECES</th><th>PRIX</th><th>CHAUFFAGE</th><th>LOCALISATION</th><th></th></tr>";
    const biens = xmlDoc.getElementsByTagName("BIENS");
    for (i = 0; i < biens.length; i++) {
        table += "<tr><td>" +
        biens[i].getElementsByTagName("ID")[0].textContent +
        "</td><td>" +
        biens[i].getElementsByTagName("BIEN")[0].textContent +
        "</td><td>" + 
        biens[i].getElementsByTagName("SURFACE")[0].textContent +
        "</td><td>" +
        biens[i].getElementsByTagName("NBPIECE")[0].textContent +
        "</td><td>" +   
        biens[i].getElementsByTagName("PRIX")[0].textContent +
        "</td><td>" +  
        biens[i].getElementsByTagName("CHAUFFAGE")[0].textContent +
        "</td><td>" +
        biens[i].getElementsByTagName("LOCALISATION")[0].textContent +
        "</td><td>" +
        //biens[i].getElementsByTagName("image")[0].textContent +
        
    
        '<button class="btn btn-outline-dark" onclick="supprimerLigne(button)">Supprimer</button>' +
        
        "</td>" +       
        "</tr>";

        
    }
    
    document.getElementById("data").innerHTML = "<table>" +  table + "</table>";
}  




 
 
 

//////////::::::://///////////////////////////////////////////////////////////////////////////////////////
//////////::::::://///////////////////////////////////////////////////////////////////////////////////////

//////////::::::://///////////////////////////////////////////////////////////////////////////////////////

//////////::::::TD1://///////////////////////////////////////////////////////////////////////////////////////



