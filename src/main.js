import {
  filterPokemonsByType,
  filterPokemonByWeakness,
  filterPokemonByResistant,
  listTypesPokemon,
  sortData,
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
// Modal top 10 
const btnOpenTop10 = document.getElementById("btnOpenTop10")
const btnClosePopup = document.getElementById("btnClosePopup")
const modal = document.getElementById("modal")
const popup = document.getElementById("popup")
const popupCard = document.getElementById("card")

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

const renderModalTop10 = (dataTop10Poke) =>{
  console.log(dataTop10Poke);
  popupCard.innerHTML=""
  dataTop10Poke.forEach((poke)=>{
    let li = document.createElement("li")
    li.classList.add("card-top10")
    li.innerHTML=`
    <figure>
      <img src=${poke.img} alt="">
    </figure>
    <p>${poke.name}</p>
    <p>Max-cp: ${poke.stats["max-cp"]}</p>
    `
    popupCard.appendChild(li)
  })
  
}




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

const sortUp = (data, sortOrderValue) =>{
  dataPoke = sortData(data,sortOrderValue)
  nextPage(dataPoke);
  previousPage(dataPoke);
}

const sortDown = (data, sortOrderValue) =>{
  dataPoke = sortData(data,sortOrderValue)
  nextPage(dataPoke);
  previousPage(dataPoke);
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
upButton.addEventListener("click", () => sortUp(dataPoke, upButton) )
// Evento Click Down 
downButton.addEventListener("click", () => sortDown(dataPoke, downButton))
// Event Change
typePokemon.addEventListener("change", filterPokemons);
// Event keyUP
searchText.addEventListener("keyup", searchPokemon )

// event of pagination
nextButton.addEventListener("click", () => nextNavigationPage(dataPoke));
previousButton.addEventListener("click", () =>
  previousNavigationPage(dataPoke)
);

// EVENTO MODAL
btnOpenTop10.addEventListener("click", ()=>{
  // console.log("Click 10");
  modal.classList.add("active")
  popup.classList.add("active")
  renderModalTop10(top10PokemonByCp(dataPoke))
})

btnClosePopup.addEventListener("click", () => {
  // console.log("cerrar");
  modal.classList.remove("active")
  popup.classList.remove("active")
})