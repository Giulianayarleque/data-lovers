import {
  filterPokemonsByType,
  filterPokemonByWeakness,
  filterPokemonByResistant,
  listTypesPokemon,
  listWeaknessPokemon,
  listResistantPokemon,
  top10PokemonByCp,
  searchPokemonByName
} from "./data.js";
import data from "./data/pokemon/pokemon.js";

// Selectores
const pokemonList = document.querySelector("#pokemonList");
const typePokemon = document.querySelector(".typePokemon");
const previousButton = document.querySelector("#previousButton");
const nextButton = document.querySelector("#nextButton");
// Elements
const infoPokemon = document.getElementById("infoPokemon");
const searchText = document.getElementById("searchText");
const upButton = document.getElementById("upButton")
const downButton = document.getElementById("downButton")

// Solo para pruebas
const fiterType = document.querySelector("#filterType");
const filterWeaknesses = document.querySelector("#filterWeaknesses");
const filterResistant = document.querySelector("#filterResistant");

// Get pokemons
const getPokemons = data.pokemon;
// Variables Globales
let dataPoke = getPokemons;
let cp1 = 0;
let cp2 = 9;

top10PokemonByCp(dataPoke);

//Function to render information pokemon
const renderInfoPokemonInit = () => {
  infoPokemon.innerHTML = "";
  let figure = document.createElement("figure");
  figure.classList.add("left__info-init");
  figure.innerHTML = `
  <img src="./img/pokeball2.gif" width="250" height="300" alt="">
  <h2>Choose your <br> pokemon? </h2>
  `;
  infoPokemon.appendChild(figure);
};

const renderInfoPokemon = (pokemon) => {
  let pokemonType = pokemon.type.map((type) => {
    return `<img src="./img/${type}.png" alt=""></img>`;
  });
  let pokemonWeakness = pokemon.weaknesses.map((weak) => {
    return `<img src="./img/${weak}.png" alt="">`;
  });
  let pokemonResistant = pokemon.resistant.map((resis) => {
    return `<img src="./img/${resis}.png" alt="">`;
  });

  infoPokemon.innerHTML = "";
  let section = document.createElement("section");
  section.classList.add("left__info-container");
  section.innerHTML = `
    <section class="left__info-img">
    <p>#${pokemon.num}</p>
      <img
        src=${pokemon.img}
        alt=${pokemon.name}
      />
      <span>${pokemon.name}</span>
  </section>
  <section class="left__card-data">
    <div >
      <p class="data-title">Type:</p>
      ${pokemonType.join("")}
    </div>
    <div>
      <p class="data-title">Weaknesses:</p>
      ${pokemonWeakness.join("")}
    </div>
    <div>
      <p class="data-title">Resistant:</p>
      ${pokemonResistant.join("")}
    </div>
    <div>
      <p class="data-title">Stats:</p>
      <span>Max-Hp:${pokemon.stats["max-hp"]}</span>
      <span>Max-CP:${pokemon.stats["max-cp"]}</span>
    </div>
    <p class="data-about">
      ${pokemon.about}
    </p>
  </section>
    `;
  infoPokemon.append(section);
};

// funcion cantida de tipos
listTypesPokemon(dataPoke);
listWeaknessPokemon(dataPoke);
listResistantPokemon(dataPoke);

// Funciones de paginacion
const nextPage = (dataPokemon) => {
  cp1 += 9;
  cp2 += 9;
  showPokemons(dataPokemon.slice(cp1, cp2));
};

const previousPage = (data) => {
  cp1 -= 9;
  cp2 -= 9;
  showPokemons(data.slice(cp1, cp2));
};

// Funcion de eventos
const nextNavigationPage = (data) => {
  nextPage(data);
};

const previousNavigationPage = (data) => {
  previousPage(data);
};

const filterPokemons = (e) => {
  e.target.selectedIndex < 19
    ? (dataPoke = filterPokemonsByType(typePokemon, getPokemons))
    : e.target.selectedIndex < 36
    ? (dataPoke = filterPokemonByWeakness(typePokemon, getPokemons))
    : e.target.selectedIndex < 54
    ? (dataPoke = filterPokemonByResistant(typePokemon, getPokemons))
    : console.log("error");
  e.target.selectedIndex = 55;
  nextPage(dataPoke);
  previousPage(dataPoke);
};

const searchPokemon = () =>{
  dataPoke = searchPokemonByName(searchText, getPokemons)
  nextPage(dataPoke);
  previousPage(dataPoke);
}

const sortUp = (data) =>{
  console.log(`click`);
}

const sortDown = (data) =>{
  console.log(`clik Down`);
}



const showPokemons = (pokemonData) => {
  // innerHTML = '' => limpiar pokemonList
  pokemonList.innerHTML = "";
  pokemonData.forEach((poke) => {
    let div = document.createElement("div");
    div.classList.add("right__list-ul");
    div.innerHTML = `
              <ul class="right__ul">
                <li class="right__ul-li pokemon" >
                  <p>#${poke.num}</p>
                  <img src=${poke.img} alt="">
                  <span>${poke.name}</span>
                </li>
              </ul>
    `;
    pokemonList.append(div);

    div.addEventListener("click", () => renderInfoPokemon(poke));
    renderInfoPokemonInit();
  });
};

// ver los primeros 9 pokemos => inicializar
showPokemons(dataPoke.slice(cp1, cp2));

// Evento Click UP
upButton.addEventListener("click", () => sortUp(dataPoke) )
// Evento Click Down 
downButton.addEventListener("click", () => sortDown(dataPoke))
// Event Change
typePokemon.addEventListener("change", filterPokemons);
// Event keyUP
searchText.addEventListener("keyup", searchPokemon )

// event of pagination
nextButton.addEventListener("click", () => nextNavigationPage(dataPoke));
previousButton.addEventListener("click", () =>
  previousNavigationPage(dataPoke)
);
