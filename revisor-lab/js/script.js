const heroesContainer = document.getElementById("heroesContainer");

function showHeroes(heroes) {
    heroesContainer.innerHTML = "";

    if (heroes.length === 0) {
        heroesContainer.textContent = "No se encontraron héroes.";
        return;
    }

    heroes.forEach(hero => {
        const card = document.createElement("article");
        card.className = "hero-card";
        card.innerHTML = `
            <img src="${hero.imagen}" alt="${hero.nombre}">
            <h3>${hero.nombre}</h3>
            <p>Rol: ${hero.rol}</p>
        `;
        heroesContainer.appendChild(card);
    });
}

async function loadHeroes() {
    const response = await fetch("http://localhost:3000/api/heroes");
    if (!response.ok) throw new Error("No se pudieron cargar los héroes");
    const heroes = await response.json();
    showHeroes(heroes);
}

loadHeroes().catch(error => {
    console.error(error);
    heroesContainer.textContent = "Error al cargar héroes.";
});
