# 🧭 Mini Pokédex

Proyecto web desarrollado con HTML, CSS (Bootstrap) y JavaScript, que consume la API pública de Pokémon para mostrar información de diferentes Pokémon de forma interactiva.

Utiliza la PokeAPI (https://pokeapi.co).

---

# 🚀 Características

- 🔎 Búsqueda de Pokémon por nombre o ID  
- 📄 Paginación de 33 Pokémon por página  
- 🎮 Filtro por generaciones (Gen 1 a Gen 9)  
- 🎨 Colores dinámicos según tipo de Pokémon  
- 🧠 Descripción del Pokémon en español o inglés  
- 🔊 Sonido de “cry” por Pokémon  
- 🎵 Música de fondo (opcional)  
- ⚡ Carga optimizada con Promise.all  
- 📱 Diseño responsive con Bootstrap  

---

# 🧩 Tecnologías utilizadas

- HTML5  
- CSS3 + Bootstrap 5  
- JavaScript (Vanilla)  
- Fetch API  
- PokeAPI  

---

# 📁 Estructura del proyecto

proyecto/
├── index.html
├── app.js
└── assets/
    └── music.mp3 (opcional)

---

# ⚙️ Funcionalidades principales

## 📄 Paginación
- 33 Pokémon por página  
- Botones de navegación por número de página  
- Cambio dinámico según generación seleccionada  

---

## 🎮 Generaciones

- Gen 1 → 1 - 151  
- Gen 2 → 152 - 251  
- Gen 3 → 252 - 386  
- Gen 4 → 387 - 493  
- Gen 5 → 494 - 649  
- Gen 6 → 650 - 721  
- Gen 7 → 722 - 809  
- Gen 8 → 810 - 905  
- Gen 9 → 906 - 1025  

---

## 🔎 Búsqueda

Permite buscar Pokémon por:

- Nombre (ej: pikachu)  
- ID (ej: 25)  

---

## 🎨 Sistema de colores por tipo

- 🔥 Fuego → rojo  
- 💧 Agua → azul  
- 🌿 Planta → verde  
- ⚡ Eléctrico → amarillo  
- 🪨 Tierra → café/gris  
- ⚪ Normal → gris claro  
- ☠️ Veneno → morado  
- 🕊️ Volador → celeste  
- 🐛 Bicho → verde claro  
- 🪨 Roca → gris oscuro  
- ❄️ Hielo → celeste claro  
- 🧠 Psíquico → rosado  
- 🐉 Dragón → violeta  
- 👻 Fantasma → morado oscuro  
- 🥊 Lucha → rojo oscuro  
- ⚙️ Acero → gris metálico  
- ✨ Hada → rosado claro  

---

## 🔊 Sonidos

Cada Pokémon puede reproducir su sonido característico (cry) mediante un botón en su carta.

---

## 🎵 Música de fondo (opcional)

- Activación manual por el usuario  
- Botón play / pause  
- Requiere interacción del usuario (restricción del navegador)  
- Recomendado usar archivo local MP3  

---

# 🧠 API utilizada

- https://pokeapi.co/api/v2/pokemon/{id}  
- https://pokeapi.co/api/v2/pokemon-species/{id}  

---

# ⚠️ Notas importantes

- Se recomienda usar Live Server para evitar problemas con audio  
- Algunas descripciones solo están en inglés si no hay versión en español  
- Las megaevoluciones no aparecen como Pokémon separados en la lista principal  

---

# 🛠️ Posibles mejoras futuras

- ⭐ Sistema de favoritos  
- ⚡ Filtro por tipo  
- 🔄 Scroll infinito en vez de paginación  
- 🧬 Árbol de evoluciones  
- 📱 Versión tipo app (PWA)  
- 🎮 Animaciones tipo videojuego
- 🐵 Visualizar evoluciones Mega

---

# 👨‍💻 Autor

Cristian D.H.

---

# 📌 Estado del proyecto

✔ Funcional  
✔ Estable  
✔ Escalable  
