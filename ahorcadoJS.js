var palabras = ["Kinal", "Carlos", "Parqueo", "Bocina", "Telefono"]; 
var rand ;
var palabra =""; 


var oculta = [];
var hueco = document.getElementById("palabra");
var cont = 6;
var buttons = document.getElementsByClassName('letra');
var btnInicio = document.getElementById("inicio");


// ### FUNCIONES ###

// Escoger palabra al azar
function generaPalabra() {
    rand =  [Math.floor(Math.random() * palabra.length)];
    palabra = palabra[rand].toUpperCase();
    console.log(palabra);
}
function guiones(num) {
    for (var i = 0; i < num; i++) {
      oculta[i] = "_";
    }
    hueco.innerHTML = oculta.join("");
}

function generaABC (a,z) {
    document.getElementById("teclado").innerHTML = "";
    var i = a.charCodeAt(0), j = z.charCodeAt(0);
    var letra = "";
    for( ; i<=j; i++) {
      letra = String.fromCharCode(i).toUpperCase();
      document.getElementById("teclado").innerHTML += "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='"+letra+"'>" + letra + "</button>";
      if(i==110) {
        document.getElementById("teclado").innerHTML += "<button value='Ñ' onclick='intento(\"Ñ\")' class='letra' id='"+letra+"'>Ñ</button>";
      }
    }
  }