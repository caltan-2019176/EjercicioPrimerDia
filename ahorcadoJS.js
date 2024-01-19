var palabras = ["Kinal", "Carlos", "Parqueo", "Bocina", "Telefono"]; 
var rand ;
var palabra =""; 


var oculta = [];
var hueco = document.getElementById("palabra");
var cont = 6;
var buttons = document.getElementsByClassName('letra');
var btnInicio = document.getElementById("inicio");



var palabraContainer = document.getElementById("palabraContainer");
var inicioContent = document.getElementById("inicioContent");
var   juegoContainer = document.getElementById("juegoContainer");

var    finJuegoContainer = document.getElementById("finJuegoContainer");
var    palabraIngresada = document.getElementById("inputPalabra");
var    letraIngresada = document.getElementById("inputLetra");
var    tecCont = document.getElementById("tecladoContainer");
var    restartBtn = document.getElementById("restartBtn");
var    startBtn = document.getElementById("startBtn");
var    infoInicio = document.getElementById("infoInicio");
var    infoJuego = document.getElementById("infoJuego");
var    finJuegoInfo = document.getElementById("finJuegoInfo");
var contadorAciertos = 0;
    
var    contadorFallas = 0;
    
let alfabeto = "abcdefghijklmnñopqrstuvwxyz"
    
var palabra = '';
    
var    pista = '';
    
let re = new RegExp(/^[A-Za-z]+$/g)



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

function generarTeclado (a,z) {
    document.getElementById("teclado").innerHTML = "";
    var i = a.charCodeAt(0), j = z.charCodeAt(0);
    var letra = "";
    for( ; i<=j; i++) {
      letra = String.fromCharCode(i).toUpperCase();
      document.getElementById("teclado").innerHTML += "<button value='" + letra + "' onclick='turnos(\"" + letra + "\")' class='letra' id='"+letra+"'>" + letra + "</button>";
      if(i==110) {
        document.getElementById("teclado").innerHTML += "<button value='Ñ' onclick='turnos(\"Ñ\")' class='letra' id='"+letra+"'>Ñ</button>";
      }
    }
  }

  function intento(letra) {
    document.getElementById(letra).disabled = true;
    if(palabra.indexOf(letra) != -1) {
      for(var i=0; i<palabra.length; i++) {
        if(palabra[i]==letra) oculta[i] = letra;
      }
      hueco.innerHTML = oculta.join("");
      document.getElementById("correcta").innerHTML = "Bien!";
    }else{
      cont--;
      document.getElementById("turnos").innerHTML = cont;
      document.getElementById("correcta").innerHTML = "Fallo!";
    }
    compruebaFin();
    setTimeout(function () { 
      document.getElementById("correcta").className = ""; 
    }, 800);
  }

  function compruebaFin() {
    if( oculta.indexOf("_") == -1 ) {
      document.getElementById("final").innerHTML = "Felicidades !!";
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
      }
      document.getElementById("inicio").innerHTML = "Empezar";
      btnInicio.onclick = function() { location.reload() };
    }else if( cont == 0 ) {
      document.getElementById("final").innerHTML = "Game Over";
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
      }
      document.getElementById("inicio").innerHTML = "Empezar";
      btnInicio.onclick = function () { location.reload() };
    }
  }
  
  function inicio() {
    generaPalabra();
    pintarGuiones(palabra.length);
    generarTeclado("a","z");
    cont = 6;
    document.getElementById("turnos").innerHTML=cont;
  }
  

  window.onload = inicio();