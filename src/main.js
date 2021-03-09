import {
  filterPokemonsByType,
  filterPokemonByWeakness,
  filterPokemonByResistant,
  //filterDataByName,
  listTypesPokemon,
  listWeaknessPokemon,
  listResistantPokemon,
  
} from "./data.js";
import data from "./data/pokemon/pokemon.js";

// Selectores
const pokemonList = document.querySelector("#pokemonList");
const typePokemon = document.querySelector(".typePokemon");
const previousButton = document.querySelector("#previousButton");
const nextButton = document.querySelector("#nextButton");
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
  //console.log(e.target.selectedIndex);
  // console.log(e.target.length);
  debugger;
  if (e.target.selectedIndex < 19) {
    //console.log(filterType.label);
    //console.log(typePokemon.value);
    dataPoke = filterPokemonsByType(typePokemon, getPokemons);
  } else if (e.target.selectedIndex < 36) {
    //console.log(filterWeaknesses.label);
    //console.log(typePokemon.value);
    dataPoke = filterPokemonByWeakness(typePokemon, getPokemons);
  } else if (e.target.selectedIndex < 54) {
    console.log(filterResistant.label);
    //console.log(typePokemon.value);
    dataPoke = filterPokemonByResistant(typePokemon, getPokemons);
  } else {
   // console.log("error");
  }
  //console.log(dataPoke);

  // dataPoke = filterPokemonsByType(typePokemon, getPokemons);
  // dataPoke = filterPokemonByWeakness(typePokemon, getPokemons);

  // dataPoke = filterPokemonByResistant(typePokemon, getPokemons);
  // console.log(dataPoke);

  nextPage(dataPoke);
  previousPage(dataPoke);
};

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
  });

  const ulPokemon = document.querySelectorAll("ul");
  ulPokemon.forEach((e) => {
    e.addEventListener("click", () => {
     // console.log(`Hola pokemon`);
    });
  });
};

// ver los primeros 9 pokemos => inicializar
showPokemons(dataPoke.slice(cp1, cp2));

// Event Change
typePokemon.addEventListener("change", filterPokemons);

// event of pagination
nextButton.addEventListener("click", () => nextNavigationPage(dataPoke));
previousButton.addEventListener("click", () =>
  previousNavigationPage(dataPoke)
);

//función de Sort
const sortUp = (dataUp) => {
  /*dataUp.sort(function (a, b) {
    if (a.num > b.num) {
      return 1;
    }
    if (a.num < b.num) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  return dataUp*/
 //console.log('Click aquí')
 //console.log(dataUp)
}
  //downUp(dataInput)
 //console.log(sortUp(dataPoke))
 const sortDown = (dataDown) => {
  /*dataDown.sort(function (a, b) {
    if (a.num > b.num) {
      return -1;
    }
    if (a.num < b.num) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });
  return dataDown*/
  //console.log('click')
  //console.log(dataDown)
}
  //sortUp(dataInput)
// console.log(sortDown(dataPoke))
 //event of button up/down 
//upButton.addEventListener("click", () => sortUp(dataPoke));
//downButton.addEventListener("click", () => sortDown(dataPoke));

/*let text = document.getElementById('searchText')

text.addEventListener("keyup",filtrarTexto);
function limpiarLista(lista){
  while(lista.firstchild){
			lista.removeChild(dataPoke.firstChild);
  }}*/

const searchInput = document.querySelector('#searchText');

 searchInput.addEventListener('keyup', () => {
  //console.log(searchInput.value.toLowerCase())
  if (searchInput.value.toLowerCase() === "all") {
    return dataPoke;
  } else {
    const dataCondition = dataPoke.filter((poke) => {
      return poke.name.startsWith(searchInput.value.toLowerCase()); 
    } );
    console.log(dataCondition)
    return dataCondition
  }
})
  //console.log(pokemonSearch)
 /* if (pokemonSearch.length === 0){
    typePokemon.innerHTML = `<p>Sin Resultados</p>`;
  } else {
    //console.log(`Ingreso`)
    tipePokemon.innerHTML = '';
    showPokemons(pokemonSearch);
    
  }*/

