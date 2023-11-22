
const cardsPage = 8;
let currentPage = 1;
let xmlDoc;

function loadCards(){
    const xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                xmlDoc=xmlhttp.responseXML;
                fetchData();
            }
        };
        xmlhttp.open("GET", "../bdd/bdd.xml", true);
        xmlhttp.send();
    }




function fetchData() {
    const biens = xmlDoc.getElementsByTagName("BIENS");
    const bienContainers = document.getElementById("bienContainers");   //document -> html
    const paginationContainer = document.getElementById("pagination-container");

    const totalPages = Math.ceil(biens.length / cardsPage);
    paginationContainer.innerHTML= "";

    for (i = 0; i < totalPages; i++) {
        const pageLink = document.createElement("span");
        pageLink.textContent = i;
        pageLink.className= "page-link"
        pageLink.addEventListener("click", function(){
            currentPage=i;
             fetchData();
        });
       paginationContainer.appendChild(pageLink);
    }
    bienContainers.innerHTML="";  

const startIndex = (currentPage - 1) * cardsPage;
const endIndex = Math.min(startIndex + cardsPage, biens.length);

for (let i = startIndex; i < endIndex; i++) {
    const superficie = biens[i].getElementsByTagName("SURFACE")[0].textContent;
    //const prix = cards[i].getElementsByTagName("prix")[0].textContent;
    const imageSrc = biens[i].getElementsByTagName("img")[0].textContent;
    const ville = biens[i].getElementsByTagName("LOCALISATION")[0].textContent;
    const id = biens[i].getElementsByTagName("ID")[0].textContent;
    const typebiens = biens[i].getElementsByTagName("BIEN")[0].textContent;
    const nbpieces = biens[i].getElementsByTagName("NBPIECE")[0].textContent;   //"let ..."[i] 

    const cardDiv = document.createElement("div");      //creation carte biens
    cardDiv.className = "BIENS";

    //const cardDivinf = document.createElement("div");
    //cardDivinf.className = "card-info";

    const cardville = document.createElement("h3");
    cardville.textContent = ville;

    const cardImage = document.createElement("img");
    cardImage.src = imageSrc;

    const cardSuperficie = document.createElement("p");
    cardSuperficie.textContent = superficie;

    const cardtypebiens = document.createElement("p");
    cardtypebiens.textContent = typebiens;

    const cardnbpieces = document.createElement("p");
    cardnbpieces.textContent = nbpieces;

    //const cardPrix = document.createElement("h5");
    //cardPrix.textContent = prix;

    const reservationButton = document.createElement("button");
    reservationButton.textContent = "faire une offre";
    reservationButton.className = "reservation-button";
    reservationButton.setAttribute("data-property-id", id);

    reservationButton.addEventListener("click", function () {
        const propertyId = this.getAttribute("data-property-id");
        window.location.href = `reservation.html?id=${propertyId}`;
    });

    const favoriteCheckbox = document.createElement("input"); //modifier
    favoriteCheckbox.type = "checkbox";
    favoriteCheckbox.className = "favorite-checkbox";
    favoriteCheckbox.setAttribute("data-property-id", id);
    
 // Ajoutez un style pour positionner en haut à droite


    favoriteCheckbox.addEventListener("change", function () {
        const propertyId = this.getAttribute("data-property-id");
        // Ajoutez ici votre logique pour ajouter ou retirer des favoris en fonction de l'état de la case à cocher
        if (this.checked) {
            // La case à cocher est cochée
            // Ajoutez la logique pour ajouter aux favoris
        } else {
            // La case à cocher est décochée
            // Ajoutez la logique pour retirer des favoris
        }
    });
    
    // Ajoutez la case à cocher à votre conteneur de carte
    cardDiv.appendChild(favoriteCheckbox);
    

    cardDiv.appendChild(cardImage);
    cardDiv.appendChild(cardnbpieces);
    cardDiv.appendChild(cardville);
    cardDiv.appendChild(cardSuperficie);
    cardDiv.appendChild(cardtypebiens);
    //cardDiv.appendChild(cardPrix);
    cardDiv.appendChild(reservationButton);
    
    bienContainers.appendChild(cardDiv);
}
}


document.addEventListener("DOMContentLoaded", loadCards);

