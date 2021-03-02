export const pagePokemon = (dataPokemon,nextNavigationPage, previousNavigationPage) =>{

    console.log( nextNavigationPage, previousNavigationPage,);
    // console.log(typeof dataPokemon.length);
    let sizePage = 9
    let numberPage = dataPokemon.length/sizePage;
    // toFixed =>  devuelve una cadena, con el número escrito con un número especificado de decimales: 
    // parseInt o + => analiza una cadena y devuelve un número entero.
    let totalPage = +numberPage.toFixed(0) 
  }