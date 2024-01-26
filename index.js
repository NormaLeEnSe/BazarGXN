document.addEventListener('DOMContentLoaded', function(){
    const jsonFilePath = 'juegos.json';

    function cargarJson(url, callback){
        var xhr = new XMLHttpRequest(); 
        xhr.overrideMimeType("application/json");
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                callback(xhr.responseText);
            }
        };
        xhr.send(null);
    }

    function manejarJSON(data){
        const juegos = JSON.parse(data);
        mostrarJuegos(juegos.juegosXbox);
    }

    function mostrarJuegos(juegos){
        const contenedor = document.querySelector('.tarjetas');

        juegos.forEach(juego =>{
            const elementoJuego =  document.createElement('div');
            elementoJuego.classList.add('juego', 'juego-container');

            elementoJuego.innerHTML = `
                <h1>${juego.nombre}</h1>
                <h2>${juego.subNombre}</h2>
                <img src="${juego.imagen}" alt="${juego.nombre}" style="max-width: 200px;">
                <p>Precio: $${juego.precio}</p>
                <p>${juego.sinopsis}</p>
                <button class="btn btn-success" onclick="meGusta('${juego.nombre}')">Me gusta</button>
                <button class="btn btn-primary" onclick="detalles('${juego.nombre}')">Detalles</button>
            
                
            `;

            contenedor.appendChild(elementoJuego);
        });
    } 

    window.meGusta = function(nombreJuego){
        const alerta = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                ¡Te gusta el juego ${nombreJuego}!
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        mostrarAlerta(alerta);
    };

    window.guardar = function(nombreJuego){
        const alerta = `
            <div class="alert alert-primary alert-dismissible fade show" role="alert">
                Has guardado el juego ${nombreJuego}.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        mostrarAlerta(alerta);
    };

    function mostrarAlerta(alerta){
        const contenedorAlertas = document.getElementById('alertas-container');
        contenedorAlertas.innerHTML += alerta;
    }

    cargarJson(jsonFilePath, manejarJSON);
});
