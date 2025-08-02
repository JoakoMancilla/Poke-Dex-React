import React, { useState, useEffect } from 'react';

export const Poke = () => {
   // Usamos un Estado para almacenar la URL de la imagen del Pokémon.
  const [spritesImg, setSpritesImg] = useState([]);
  const [pokemon, setPokemon] = useState([]);


  const obtenerPokemon = () => {
    const poke = document.getElementById("poke").value;
    obtenerDatos(poke);
    obtenerImagen(poke);
    //Limpiamos el campo
    document.getElementById("poke").value = "";
  }

  //Funcion asincronioca para obtener la imagen
  const obtenerImagen = async (poke) => {
    const imagenSprite = []; //Declaramos un arreglo que nos ayudará a contener la imagen

    //Hacemos la petición HTTP a la API donde dicha peticion sera guardada en la variable "sprite"
    const sprite = await fetch("https://pokeapi.co/api/v2/pokemon-form/" + poke + "/");

    //La peticion la convertiremos en un objeto JSON para poder acceder a sus propiedades (dicho formato se guardara en la variable imagenJson)
    const imagenJson = await sprite.json();

    //Guardamos (o pusheamos ) en el arreglo, la imagen extraida (desde front_default)
    imagenSprite.push(imagenJson.sprites.front_default);

    //Actualizamos el estado con la nueva imagen
    setSpritesImg(imagenSprite);
  }

  const obtenerDatos = async (poke) => {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/" + poke + "/")
    const listaPokemon = await respuesta.json();
    setPokemon(listaPokemon);
  }

  //Al cargar la pagina, useEffect se encarga de mandar a llamar (en este caso) a la funcion; obtenerImagen
  //Ademas agregamos la funcionalidad de que siempre se mando a llamar a un pokemon (en este caso al primero)
  useEffect(() => {
    const poke = "1"
    obtenerImagen(poke);
    obtenerDatos(poke);
  }, []);



  return (
  <div>

    <div className="text-center space-y-6 p-6">
      <h1 className="text-4xl font-bold text-gray-800">Pokedex</h1>

      <img className=" bg-[#D32453] w-[400px] h-[650px] object-cover mx-auto border-2 border-gray-900 rounded-2xl shadow-2xl" src="sprites/Pokedex.svg" alt="pokedex" />


      <h1>Hola Mundo</h1>

      <button onClick={obtenerPokemon}>Buscar</button>

      <input id="poke" type="text" placeholder='Numero de pokemon' />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{pokemon.id}</td>
            <td>{pokemon.name}</td>
            <td>{pokemon.types?.[0]?.type?.name}</td>
            <td>
              <img src={spritesImg} alt="img poke" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  )
}