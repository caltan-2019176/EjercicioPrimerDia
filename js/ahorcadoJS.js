var palabra_seleccionada = '';
var concordancias = [];
var intentos = 7;
var fallos = 0;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const intentosLabel = document.getElementById("intentos-restantes");


function seleccionarPalabra(palabras){
    var total_palabras = palabras.length -1;
    var rand = (Math.random() * total_palabras).toFixed(0);
    palabra_seleccionada = palabras[rand].toLowerCase();
    pintarPalabra(palabra_seleccionada);
}


function chequear(event){
    comprobarLetra(event.target.textContent);
    
}



function pintarPalabra(palabra){
    var str = '';
    var letras = palabra.split('');

    letras.forEach((l, i) => {
        if(concordancias.includes(l)){
            str += `<div class="oculto">${l}</div>`;
        }else{
            
            concordancias[i] = "_";
            str += `<div class="oculto">?</div>`;
        }
    });
    document.getElementById("word").innerHTML = str;
}


function actualizarIntentos() {
    intentosLabel.textContent = intentos.toString(); 
}

function abc(){
    var a = 97;
    var z = 123;
    
    var letras = document.getElementById("letras");
    for(var l = a; l < z ; l++){
        const char = String.fromCharCode(l);

        var letra = document.createElement('div');
        letra.classList.add('abc', 'bg-secondary', 'text-primary', 'manito');
        letra.setAttribute('id', 'letra-' + char);
        letra.textContent = char;
        
        letra.addEventListener('click', chequear);
        
        letras.appendChild(letra);
    }
    
}

function dibujo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(100, 20);
    ctx.lineTo(100, 250);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();

    if (fallos >= 1) {
        ctx.beginPath();
        ctx.moveTo(100, 20);
        ctx.lineTo(180, 60);
        ctx.stroke();
        ctx.closePath();
    }
    
    
    if (fallos >= 2) {
        ctx.beginPath();
        ctx.arc(150, 70, 20, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
    }
   
    if (fallos >= 3) {
        ctx.beginPath();
        ctx.moveTo(150, 90);
        ctx.lineTo(150, 150);
        ctx.stroke();
        ctx.closePath();
    }

    
    if (fallos >= 4) {
        ctx.beginPath();
        ctx.moveTo(150, 95);
        ctx.lineTo(120, 125);
        ctx.stroke();
        ctx.closePath();
    }
    if (fallos >= 5) {
        ctx.beginPath();
        ctx.moveTo(150, 95);
        ctx.lineTo(180, 125);
        ctx.stroke();
        ctx.closePath();
    }

    
    if (fallos >= 6) {
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.lineTo(120, 190);
        ctx.stroke();
        ctx.closePath();
    }
    if (fallos >= 7) {
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.lineTo(180, 190);
        ctx.stroke();
        ctx.closePath();
    }
}

function mostrarResultado(ganador) {
    const resultadoPopup = document.getElementById("resultado-popup");
    const resultadoTexto = document.getElementById("texto-resultado");
    const nuevoJuego = document.getElementById("nuevo-juego");

    if (ganador) {
        resultadoTexto.textContent = "Haz ganado, La palabra es:"  + palabra_seleccionada;
    } else {
        resultadoTexto.textContent = "haz perdido, La palabra era: "+ palabra_seleccionada;
    }

    resultadoPopup.classList.remove("hide");

    nuevoJuego.addEventListener("click", () => {
        window.location.reload();
        resultadoPopup.classList.add("hide");  
        start();
    });
}


function comprobarLetra(char){
    var letra = document.getElementById('letra-'+ char);

    if(palabra_seleccionada.indexOf(char) != -1) {
        for(var i = 0; i < palabra_seleccionada.length; i++){
            if(palabra_seleccionada[i] == char) concordancias[i] = char; 
        }

        pintarPalabra(palabra_seleccionada); 
        letra.classList.remove("bg-secondary", "text-primary");
        letra.classList.add("bg-warning")
    }else {
        intentos--; 
        fallos++; 
        actualizarIntentos();
        letra.classList.remove("bg-secondary"); 
        letra.classList.add("bg-dark");
        dibujo();
        
    }
    letra.classList.toggle("manito");
    
    letra.removeEventListener('click', chequear);
    
    comprobarPalabra();

}



function comprobarPalabra(){
    if(intentos == 0){
       
        mostrarResultado(false);
     
    }else if(concordancias.indexOf("_") == -1){

       mostrarResultado(true);
     
    }
}

function start(){
    seleccionarPalabra(WORDS);
    abc();
   
}

start();

