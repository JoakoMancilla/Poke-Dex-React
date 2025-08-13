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
    <div className="text-center p-6">

      <h1 className="text-4xl font-bold text-gray-800">Pokedex</h1>

      {/* Contenedor imagen + contenido */}
      <div className="relative w-[400px] h-[650px] bg-[#D32453] mx-auto border-4 border-gray-900 rounded-2xl shadow-2xl">

        <img
          className=" w-full h-full object-cover rounded-2xl"
          src="sprites/PokedexV2.svg"
          alt="pokedex"
        />

        <img className='absolute top-[120px] left-1/2 -translate-x-1/2 w-[350px] h-[350px] border-2 border-gray-900 rounded-xl'
        src='sprites/fondo.png' alt="img poke" />

        <img className='absolute top-[90px] left-1/2 -translate-x-1/2 w-2xl'
        src={spritesImg} alt="img poke" />

        <div className='absolute top-[490px] w-[350px] left-1/2 -translate-x-1/2 bg-[#636363] p-4 border-2 border-gray-950 rounded-[6px]'>

          <div className='bg-[#539A44] border-2 border-gray-950 rounded-[6px] w-full font-bold text-gray-900'>
            <table>
              <thead className='text-gray-950'>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='px-6'>{pokemon.id}</td>
                  <td className='px-6'>{pokemon.name}</td>
                  <td className='px-6'>{pokemon.types?.[0]?.type?.name}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <button className=" bg-gray-800
          text-white font-bold mr-1 py-1 mt-2 px-2 border-2 border-gray-950 rounded-[6px]" onClick={obtenerPokemon}>Buscar</button>

          <input id="poke" type="text" placeholder='Numero de pokemon'
            className="
            py-1 px-2 border-2 bg-[#539A44] border-gray-950 rounded-[6px]
            font-bold  text-gray-950 
            focus:bg-[#539A44] focus:outline-none
            autofill:bg-[#539A44] autofill:text-gray-950
            "/>
        </div>

      </div>

    </div>

  </div>
  )
}