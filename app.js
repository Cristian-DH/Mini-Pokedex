
const contenedor = document.getElementById("pokedex");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

const pageNumbers = document.getElementById("pageNumbers");

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let pagina = 1;
const porPagina = 33;

let rangoActual = [1, 151];

let cargando = false;


// 🎵 MÚSICA LOCAL (ESTABLE 100%)
bgMusic.src = "assets/music.mp3";
bgMusic.volume = 0.3;
bgMusic.loop = true;
bgMusic.load();

let playing = false;


// 🎵 BOTÓN MÚSICA (VERSIÓN DEFINITIVA)
musicBtn.addEventListener("click", async () => {

    if (!playing) {

        try {
            await bgMusic.play();
            playing = true;
            musicBtn.textContent = "⏸ Música";
        } catch (err) {
            console.log(err);
            alert("No se pudo reproducir la música. Usa Live Server.");
        }

    } else {
        bgMusic.pause();
        playing = false;
        musicBtn.textContent = "🎵 Música";
    }
});


// 🔊 SONIDO POKEMON
function reproducirSonido(url) {
    const audio = new Audio(url);
    audio.play();
}


// 📖 DESCRIPCIÓN
async function obtenerDescripcion(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const data = await res.json();

    const entry =
        data.flavor_text_entries.find(e => e.language.name === "es") ||
        data.flavor_text_entries.find(e => e.language.name === "en");

    return entry
        ? entry.flavor_text.replace(/\f|\n/g, " ")
        : "Sin descripción.";
}


// 🧠 POKEMON
async function obtenerPokemon(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    const descripcion = await obtenerDescripcion(id);

    return {
        id: data.id,
        nombre: data.name,
        imagen: data.sprites.other["official-artwork"].front_default,
        tipo: data.types.map(t => t.type.name),
        experiencia: data.base_experience,
        descripcion,
        cry: data.cries.latest
    };
}


// 🎨 COLORES
function colorTipo(tipo) {
    switch (tipo) {
        case "fire": return "#f44336";
        case "water": return "#2196f3";
        case "grass": return "#4caf50";
        case "electric": return "#ffeb3b";
        case "ground": return "#8d6e63";
        case "normal": return "#e0e0e0";
        case "poison": return "#9c27b0";
        case "flying": return "#90caf9";
        case "bug": return "#8bc34a";
        case "rock": return "#a1887f";
        case "psychic": return "#e91e63";
        case "ice": return "#00bcd4";
        case "dragon": return "#673ab7";
        case "ghost": return "#5e35b1";
        case "dark": return "#424242";
        case "steel": return "#9e9e9e";
        case "fairy": return "#f8bbd0";
        case "fighting": return "#d32f2f";
        default: return "#ffffff";
    }
}


// 🃏 CARTA
function crearCarta(pokemon) {

    const tipo1 = pokemon.tipo[0];
    const tipo2 = pokemon.tipo[1];

    let fondo = tipo2
        ? `linear-gradient(90deg, ${colorTipo(tipo1)} 50%, ${colorTipo(tipo2)} 50%)`
        : colorTipo(tipo1);

    const html = `
    <div class="col">
        <div class="card text-center shadow h-100" style="background:${fondo};">

            <img src="${pokemon.imagen}" class="card-img-top p-3">

            <div class="card-body">

                <h5>#${pokemon.id} ${pokemon.nombre}</h5>

                <p>${pokemon.tipo.join(" / ")}</p>
                <p>${pokemon.experiencia}</p>

                <p style="font-size:12px;">${pokemon.descripcion}</p>

                <button class="btn btn-dark btn-sm"
                    onclick="reproducirSonido('${pokemon.cry}')">
                    🔊
                </button>

            </div>
        </div>
    </div>
    `;

    contenedor.insertAdjacentHTML("beforeend", html);
}


// ⚡ CARGA
async function cargarPagina() {

    contenedor.innerHTML = "";

    const inicio = rangoActual[0] + (pagina - 1) * porPagina;
    const fin = Math.min(inicio + porPagina - 1, rangoActual[1]);

    const promesas = [];

    for (let i = inicio; i <= fin; i++) {
        promesas.push(obtenerPokemon(i));
    }

    const data = await Promise.all(promesas);

    data.forEach(p => crearCarta(p));

    renderPaginas();
}


// 📄 PAGINAS
function renderPaginas() {

    const max = Math.ceil((rangoActual[1] - rangoActual[0] + 1) / porPagina);

    pageNumbers.innerHTML = "";

    for (let i = 1; i <= max; i++) {

        const btn = document.createElement("button");

        btn.textContent = i;

        btn.className = "btn btn-sm " + (i === pagina ? "btn-warning" : "btn-outline-light");

        btn.onclick = () => {
            pagina = i;
            cargarPagina();
        };

        pageNumbers.appendChild(btn);
    }
}


// 🎮 GEN
function cargarGeneracion(gen) {

    const gens = {
        1: [1, 151],
        2: [152, 251],
        3: [252, 386],
        4: [387, 493],
        5: [494, 649],
        6: [650, 721],
        7: [722, 809],
        8: [810, 905],
        9: [906, 1025]
    };

    rangoActual = gens[gen];
    pagina = 1;

    cargarPagina();
}


// 🔄 BOTONES
prevBtn.onclick = () => { if (pagina > 1) { pagina--; cargarPagina(); } };
nextBtn.onclick = () => { pagina++; cargarPagina(); };


// 🔍 BUSCAR
searchBtn.onclick = async () => {

    const name = searchInput.value.toLowerCase().trim();
    if (!name) return;

    contenedor.innerHTML = "";

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();

        const desc = await obtenerDescripcion(data.id);

        crearCarta({
            id: data.id,
            nombre: data.name,
            imagen: data.sprites.other["official-artwork"].front_default,
            tipo: data.types.map(t => t.type.name),
            experiencia: data.base_experience,
            descripcion: desc,
            cry: data.cries.latest
        });

    } catch {
        contenedor.innerHTML = "<p class='text-center'>No encontrado 😢</p>";
    }
};


// 🔄 RESET
resetBtn.onclick = () => {
    pagina = 1;
    searchInput.value = "";
    cargarPagina();
};


// 🚀 INIT
cargarPagina();
