function Connection() {
    var password = document.getElementById("mdp").value;
    var user = document.getElementById("pseudo").value;
 
    if (user === "souadvienne@gmail.com" && password === "web") {
        // Redirection vers la page "admin.html"
        window.location.href = "pageModifsA.html";
    } else {
        // Affichage du message d'erreur
        document.getElementById("error-message").innerText = "Mot depasse ou pseudo incorrect.";
    }
    // Assurez-vous que la fonction ne retourne pas de valeur
    console.log("Connection function executed"); // Ajoutez cetteligne pour vérifier l'exécution dans la console
 }

 const cardsPage = 7;
 let currentPage = 1;
 let xmlDoc;
 let sFav = new Set;

 
 function loadCards() {
     const xmlhttp = new XMLHttpRequest();
     console.log(xmlhttp.responseText);
     xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            xmlDoc = xmlhttp.responseXML; 
             fetchData();
             getFavoriteIds();
             fetchFavoriteData();
             
         }
     };
     xmlhttp.open("GET", "../bdd/bdd.xml", true);
     xmlhttp.send();
 }
 
 function fetchData() {
     const biens = xmlDoc.getElementsByTagName("BIENS");
     const bienContainers = document.getElementById("bienContainers");
     const paginationContainer = document.getElementById("pagination-container");
 
     const totalPages = Math.ceil(biens.length / cardsPage);
     paginationContainer.innerHTML = "";
     bienContainers.innerHTML = ""; // Nettoyer les biens précédents
 
     for (let i = 0; i < totalPages; i++) {
         const pageLink = document.createElement("span");
         pageLink.textContent = i + 1; // Ajouter 1 pour correspondre au numéro de page réel
         pageLink.className = "page-link";
 
         pageLink.addEventListener("click", function () {
             currentPage = i + 1; // Mettre à jour la page actuelle
             fetchData(); // Recharger les biens pour la nouvelle page
         });
 
         paginationContainer.appendChild(pageLink);
 
         // Ajouter un espace pour séparer visuellement les liens de pagination
         paginationContainer.appendChild(document.createTextNode(" "));
     }
 
     const startIndex = (currentPage - 1) * cardsPage;
     const endIndex = Math.min(startIndex + cardsPage, biens.length);
 
     for (let i = startIndex; i < endIndex; i++) {
         const superficie = biens[i].getElementsByTagName("SURFACE")[0].textContent;
         const imageSrc = biens[i].getElementsByTagName("image")[0].textContent;
         const ville = biens[i].getElementsByTagName("LOCALISATION")[0].textContent;
         const id = biens[i].getElementsByTagName("ID")[0].textContent;
         const typebiens = biens[i].getElementsByTagName("BIEN")[0].textContent;
         const nbpieces = biens[i].getElementsByTagName("NBPIECE")[0].textContent;
         const prix= biens[i].getElementsByTagName("PRIX")[0].textContent;
         const chauffage= biens[i].getElementsByTagName("CHAUFFAGE")[0].textContent;
        
         const cardDiv = document.createElement("div");
         cardDiv.className = "BIENS";
 
         const cardville = document.createElement("h3");
         cardville.textContent = ville;
 
         const cardImage = document.createElement("img");
         console.log(imageSrc);
         cardImage.src = imageSrc;
 
         const cardSuperficie = document.createElement("p");
         cardSuperficie.textContent = superficie;
 
         const cardtypebiens = document.createElement("p");
         cardtypebiens.textContent = typebiens;
 
         const cardnbpieces = document.createElement("p");
         cardnbpieces.textContent = nbpieces;

         const cardPrix=document.createElement("p");
         cardPrix.textContent = prix;

         const cardChauffage = document.createElement("p");
         cardChauffage.textContent= chauffage;

 
         const reservationButton = document.createElement("button");
         reservationButton.textContent = "Faire une offre";
         reservationButton.className = "reservation-button";
         reservationButton.setAttribute("data-property-id", id);
 
         reservationButton.addEventListener("click", function () {
             const propertyId = this.getAttribute("data-property-id");
             window.location.href = `reservation.html?id=${propertyId}`;
         });
 
         const favoriteCheckbox = document.createElement("input");
         favoriteCheckbox.type = "checkbox";
         favoriteCheckbox.className = "favorite-checkbox";
         favoriteCheckbox.setAttribute("data-property-id", id);
 
         favoriteCheckbox.addEventListener("change", function () {
            const propertyId = this.getAttribute("data-property-id");
            // Logique pour ajouter ou retirer des favoris
            if (this.checked) {
               sFav.add(this.checked.valueOf);
               localStorage.setItem("favorites", Array.from(sFav).join(','));  //quand je rajoute en favoris, aussi rajouté dans local storage (garde en memoire par user)
               console.log("Checked - id :" + ev.currentTarget.value); 
            } else {
               console.log("Unchecked - id :" + ev.currentTarget.value); 
               sFav.delete(ev.currentTarget.value);        
            }
        });
 
         cardDiv.appendChild(favoriteCheckbox);
         cardDiv.appendChild(cardImage);
         cardDiv.appendChild(cardnbpieces);
         cardDiv.appendChild(cardville);
         cardDiv.appendChild(cardSuperficie);
         cardDiv.appendChild(cardtypebiens);
         cardDiv.appendChild(reservationButton);
         cardDiv.appendChild(cardPrix);
         cardDiv.appendChild(cardChauffage);
 
         bienContainers.appendChild(cardDiv);
     }
     document.addEventListener("DOMContentLoaded", loadCards);
 
 }






 
 
 

//////////::::::://///////////////////////////////////////////////////////////////////////////////////////
//////////::::::://///////////////////////////////////////////////////////////////////////////////////////

//////////::::::://///////////////////////////////////////////////////////////////////////////////////////

//////////::::::TD1://///////////////////////////////////////////////////////////////////////////////////////


