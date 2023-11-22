// Fonction pour rechercher les biens immobiliers
function searchProperties() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        displayResults(this);
      }
    };
    xhttp.open('GET', 'acheter.xml', true); // Remplacez 'biens_immobiliers.xml' par le chemin vers votre fichier XML
    xhttp.send();
    
    // Fonction pour afficher les résultats de la recherche
    function displayResults(xml) {
      const xmlDoc = xml.responseXML;
      const properties = xmlDoc.getElementsByTagName('PROPERTY');
      let searchResults = '';
  
      for (let i = 0; i < properties.length; i++) {
        const location = properties[i].getElementsByTagName('LOCALISATION')[0].childNodes[0].nodeValue.toLowerCase();
  
        if (location.includes(searchInput)) {
          searchResults += '<p>' + properties[i].getElementsByTagName('DESCRIPTION')[0].childNodes[0].nodeValue + '</p>';
          // Vous pouvez ajouter d'autres informations que vous souhaitez afficher pour chaque résultat
        }
      }
  
      const searchResultsContainer = document.getElementById('searchResults');
      searchResultsContainer.innerHTML = searchResults !== '' ? searchResults : 'Aucun résultat trouvé.';
    }
  }
  