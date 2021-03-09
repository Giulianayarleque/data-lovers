export const filterPokemonsByType = (typePokemon, dataPokemon) => {
  if (typePokemon.value === "all") {
    return dataPokemon;
  } else {
    // array funtion filter =>
    const dataType = dataPokemon.filter((poke) => {
      return poke.type.includes(typePokemon.value);
    });
    return dataType;
  }
};

export const filterPokemonByWeakness = (valueWeakness, dataPokemon) => {
  if (valueWeakness.value === "all") {
    return dataPokemon;
  } else {
    const dataWeakness = dataPokemon.filter((poke) =>
      poke.weaknesses.includes(valueWeakness.value)
    );
    return dataWeakness;
  }
};
export const filterPokemonByResistant = (valueResistant, dataPokemon) => {
  if (valueResistant.value === "all") {
    return dataPokemon;
  } else {
    const dataResistant = dataPokemon.filter((poke) =>
      poke.resistant.includes(valueResistant.value)
    );
    return dataResistant;
  }
};

export const listTypesPokemon = (dataPokemon) => {
  // console.log(dataPokemon);
  const arrayTypePokemon = [];
  for (let i = 0; i < dataPokemon.length; i++) {
    const newData = dataPokemon[i].type;
    for (let j = 0; j < newData.length; j++) {
      // console.log(newData[j]);
      arrayTypePokemon.push(newData[j]);
    }
  }
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  // constructor set => Use to remove duplicate elements from the array
  // sort => Metodo ordena los elementos de un array (corresponde a la posicion del string de acuerdo a su valor)
  // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  const arrayListTypePokemon = [...new Set(arrayTypePokemon)].sort();
  // console.log(arrayListTypePokemon);
  return arrayListTypePokemon;
};

export const listWeaknessPokemon = (dataPokemon) => {
  // console.log(dataPokemon);
  const arrayWeaknessPokemon = [];
  dataPokemon.map((poke) => {
    const newData = poke.weaknesses;
    newData.map((weak) => arrayWeaknessPokemon.push(weak));
  });
  const arrayListWeaknessPokemon = [...new Set(arrayWeaknessPokemon)].sort();
  // console.log(arrayListWeaknessPokemon);
  return arrayListWeaknessPokemon;
};

export const listResistantPokemon = (dataPokemon) => {
  // console.log(dataPokemon);
  const arrayResistantPokemon = [];
  dataPokemon.map((poke) => {
    const newData = poke.resistant;
    newData.map((resis) => arrayResistantPokemon.push(resis));
  });
  // console.log(arrayResistantPokemon);
  const arrayListResistantPokemon = [...new Set(arrayResistantPokemon)].sort();
  // console.log(arrayListResistantPokemon);
  return arrayListResistantPokemon;
};

export const top10PokemonByCp = (dataPokemon) => {
  // const arrayCp = dataPokemon.map((e)=> e.stats["max-cp"])
  const arrayCpOrder = dataPokemon.sort((a,b)=> b.stats["max-cp"]-a.stats["max-cp"])
  const top10CpMax = arrayCpOrder.slice(0,10)
  console.log(top10CpMax);
  
};

export const searchPokemonByName = (searchInput, dataPokemon) =>{
  // toLowerCase() => Metodo de string para convertir el input a minusculas 

  let inputValue = searchInput.value.toLowerCase()
  if (inputValue=== "all") {
    return dataPokemon
  }else{
    const dataFilterByText = dataPokemon.filter((poke)=>{
      
      return poke.name.startsWith(inputValue)
    })
    console.log(dataFilterByText);
    return dataFilterByText
  }
}


