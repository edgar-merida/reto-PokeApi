var pokemones = [];
var imagenes = [];
var entrada = document.querySelector('#entrada');
var boton = document.querySelector('#boton');


function obtenerDatos(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function () {
            if (xhr.status == "200") {
                resolve(JSON.parse(xhr.response))
            }
            else {
                reject();
            }
        };
        xhr.send();
    });
};

function asignarNombres() {
    let contenedorHTML = '';
    for (let index = 1; index < 253; index++) {
            obtenerDatos('https://pokeapi.co/api/v2/pokemon/' + index)
            .then(data => {
                pokemones.push(data);
                const id = data.id;
                const sprite = data.sprites.front_default;
                const name = data.name;
                const type1 = data.types[0].type.name;

                if (data.types.length > 1) {
                    const type2 = data.types[1].type.name;
                    contenedorHTML += `
                <div class="col-md-3" id="tarjetas">
                <a href="">
                <img src="${sprite}" alt="" class="imagen">
                </a>
                <h6 class="titulo">ID: ${id}</h6>
                <h6 class="titulo">Name: ${name}</h6>
                <h6 class="titulo">Type: ${type1} ${type2}</h6>
                </div>
                         `;
                    contenedor.innerHTML = contenedorHTML;
                }
                else {
                    contenedorHTML += `
            <div class="col-md-3" id="tarjetas">
            <a href="">
            <img src="${sprite}" alt="" class="imagen">
            </a>
            <h6 class="titulo">ID: ${id}</h6>
            <h6 class="titulo">Name: ${name}</h6>
            <h6 class="titulo">Type: ${type1}</h6>
            </div>
                     `;
                    contenedor.innerHTML = contenedorHTML;
                }
            })
            .catch(error => {
                console.log("Error en la solicitud al servidor!");
            });
    }
};

async function buscar(nombre) {
    const id = ('https://pokeapi.co/api/v2/pokemon/'+nombre);
    const contenedor = document.querySelector('#contenedor');   
    let contenedorHTML = '';
            obtenerDatos(id)
            .then(data => {
            console.log(data);
            const id = data.id;
            const sprite = data.sprites.front_default;
            const name = data.name;
            const type1 = data.types[0].type.name;
            if (data.types.length > 1) {
                const type2 = data.types[1].type.name;
                contenedorHTML += `
                <div class="col-md-8" id="tarjetas">
                <a href="">
                <img src="${sprite}" alt="" class="imagen">
                </a>
                <h6 class="titulo">ID: ${id}</h6>
                <h6 class="titulo">Name: ${name}</h6>
                <h6 class="titulo">Type: ${type1} ${type2}</h6>
                </div>
                         `;
                contenedor.innerHTML = contenedorHTML;
            }
            else {
                contenedorHTML += `
            <div class="col-md-8" id="tarjetas">
            <a href="">
            <img src="${sprite}" alt="" class="imagen">
            </a>
            <h6 class="titulo">ID: ${id}</h6>
            <h6 class="titulo">Name: ${name}</h6>
            <h6 class="titulo">Type: ${type1}</h6>
            </div>
                     `;
                contenedor.innerHTML = contenedorHTML;
            }
        })
        .catch(error => {
            console.log("Error en la solicitud al servidor! Nombre o ID no encontrado");
            alert("Error en la solicitud al servidor! Nombre o ID no encontrado");
        });
};


asignarNombres();
//buscar();






/*function buscar(nombre) {
    const urlAPI = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=54eca59010706dfd82ae915d188d04d2&hash=d366aedb019e36904fa99dc717bc587d&limit=51';
    const contenedor = document.querySelector('#contenedor');
    let html = '';
    fetch(urlAPI)
        .then(resultado => resultado.json())
        .then((json) => {
            for (let index = 0; index < json.data.results.length; index++) {
                const element = json.data.results[index];
                const link = element.urls[0].url;
                if (element.name == nombre) {
                    contenedor.innerHTML = '';
                    html += `
            <div class="col-md-10">
               <a href="${link}">
                  <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="" class="imagen">
               </a>
               <h3 class="titulo">${element.name}</h3>
           </div>
                    `;
                }
            }
            contenedor.innerHTML = html;
        })
};*/
