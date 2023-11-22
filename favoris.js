let xmlhttp = new XMLHttpRequest();

let sFav = new Set();

function loadXMLDoc() {    
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { 
            initSetFavoriteBooks();  
            fetchData();
            fetchFavoriteBooks();        
        }
    };
    xmlhttp.open("GET", "../bdd/bdd.xml", true);
    xmlhttp.send();
}

function fetchData() {
    let i;
    let xmlDoc = xmlhttp.responseXML;    
    let table = "<tr><th>ID</th><th>Book</th><th>Authors</th><th></th></tr>";    
    let x = xmlDoc.getElementsByTagName("book");
        
    for (i = 0; i < x.length; i++) {        
        table += "<tr>" 
        + "<td>" 
        + x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue 
        + "</td>" 
        + "<td>" 
        + x[i].getElementsByTagName("SURFACE")[0].childNodes[0].nodeValue 
        + "</td>" 
        + "<td>" 
        + x[i].getElementsByTagName("BIEN")[0].childNodes[0].nodeValue 
        + "</td>" 
        + "<td>";


        if(sFav.has(x[i].getElementsByTagName("BIENS")[0].childNodes[0].nodeValue)){
            table+="<input type='checkbox' checked onclick='setFavorite(event)' value='"
            + x[i].getElementsByTagName("BIENS")[0].childNodes[0].nodeValue
            + "'>"
            +"</td>"
            +"</tr>";
        }else {
            table+="<input type='checkbox' onclick='setFavorite(event)' value='"
            + x[i].getElementsByTagName("BIENS")[0].childNodes[0].nodeValue
            + "'>"
            +"</td>"
            +"</tr>";
        }
        
    }

    document.getElementById("data").innerHTML = table;
} 

//Etape 1
function setFavorite(ev){
    if (ev.currentTarget.checked) {
        sFav.add(ev.currentTarget.value);
        localStorage.setItem("favorites", Array.from(sFav).join(','));  //quand je rajoute en favoris, aussi rajouté dans local storage (garde en memoire par user)
        console.log("Checked - id :" + ev.currentTarget.value);        
    } else {
        console.log("Unchecked - id :" + ev.currentTarget.value); 
        sFav.delete(ev.currentTarget.value);        
    }
    console.log(sFav);
    fetchFavoriteBooks();  //pour cocher/decocher sur case A RAJOUTER ABSOLUMENT
}
//sFav decrit tout en haut

//Etape 2
function fetchFavoriteBooks() {
    let i;
    let xmlDoc = xmlhttp.responseXML;
    let table = "<tr><th>ID</th><th>Book</th><th>Authors</th></tr>";
    let x = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < x.length; i++) {
        if (sFav.has(x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue)) {
            table += "<tr>" +
                "<td>" +
                x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue +
                "</td>" +
                "<td>" +
                x[i].getElementsByTagName("SURFACE")[0].childNodes[0].nodeValue +
                "</td>" +
                "<td>" +
                x[i].getElementsByTagName("BIEN")[0].childNodes[0].nodeValue +
                "</td>" +
                "</tr>";
        }
    }

    document.getElementById("tblFavorite").innerHTML = table;
}



//Etape 3
function initSetFavoriteBooks(){
    if (localStorage.getItem("favorites") != null){
        let favs = localStorage.getItem("favorites");
        let myArr = favs.split(",");
        for (let i = 0; i < myArr.length; i++) {
            sFav.add(myArr[i]);
            console.log(myArr[i]); 
        }   
       
    } 
}