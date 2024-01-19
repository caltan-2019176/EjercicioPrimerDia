var palabra_seleccionada = '';
var concordancias = [];
var intentos = 7;
var fallos = 0;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const intentosLabel = document.getElementById("intentos-restantes");

//Selecciona una palabra
function seleccionarPalabra(palabras){
    var total_palabras = palabras.length -1;
    var rand = (Math.random() * total_palabras).toFixed(0);
    palabra_seleccionada = palabras[rand].toLowerCase();
    console.log(palabra_seleccionada);
    pintarPalabra(palabra_seleccionada);
}

// función para verificar si ya se utilizo una letra
function chequear(event){
    comprobarLetra(event.target.textContent);
    
}


//Pinta las letras
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

//Actualiza los intentos de la etiqueta <p>
function actualizarIntentos() {
    intentosLabel.textContent = intentos.toString(); // Convierte el valor a texto y actualiza el contenido
}
//genera el teclado
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
        //añade el evento a la tecla
        letra.addEventListener('click', chequear);
        
        letras.appendChild(letra);
    }
}
//CANVAS
function drawHangman() {
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
        resultadoTexto.textContent = "Haz ganado, presiona el botón volver a iniciar, La palabra es:"  + palabra_seleccionada;
    } else {
        resultadoTexto.textContent = "haz perdido, presiona el botón para una nueva partida, La palabra era: "+ palabra_seleccionada;
    }

    resultadoPopup.classList.remove("hide");

    nuevoJuego.addEventListener("click", () => {
        window.location.reload();
        resultadoPopup.classList.add("hide");  
        start();
    });
}

//comprueba la letra si es correcta o no
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
        letra.classList.remove("bg-secondary", "text-primary"); 
        letra.classList.add("bg-dark", 'text-light');
       drawHangman();
        
    }
    letra.classList.toggle("manito");
    //remueve el vento de la tecla
    letra.removeEventListener('click', chequear);
    //verifica si la palabra fue completada o no
    comprobarPalabra();

}


//Comprobar los intentos y recarga la página
function comprobarPalabra(){
    if(intentos == 0){
       //alert('Haz perdido, presiona el botón volver a iniciar ' + 'La palabra era: ' + palabra_seleccionada )
        mostrarResultado(false);
      //  window.location.reload();
        //start();
    }else if(concordancias.indexOf("_") == -1){
       // alert('haz GANADO, presiona el botón para una nueva partida, '+ 'La palabra es: '+ palabra_seleccionada)
       mostrarResultado(true);
        //window.location.reload();
        //start();
    }
}

function start(){
    seleccionarPalabra(WORDS);
    abc();
   
}

start();

