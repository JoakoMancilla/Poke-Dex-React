import React, { useState, useEffect } from 'react';

export const Poke = () => {
   // Usamos un Estado para almacenar la URL de la imagen del Pokémon.
  const [spritesImg, setSpritesImg] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [mensaje, setMensaje] = useState("");


  const obtenerPokemon = () => {
    const dato = document.getElementById("poke").value;
    const poke = dato.trim().toLowerCase(); //Normalizamos el dato, es decir; quitamos espacios delante y drtas de la palabra y la volvemos a minuscula
    if (poke.toString().length > 0){
      obtenerDatos(poke);
      obtenerImagen(poke);
      //Limpiamos el campo
      document.getElementById("poke").value = "";
      setMensaje("cargando...")
    }else{
      alert("No Has Ingresdado Datos!!!")
      return;
    }
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
    if (respuesta.ok){
      const listaPokemon = await respuesta.json();
      setPokemon(listaPokemon);
      setMensaje("") //en caso de si encontrarse elementos en la api... mandamos este mensaje vacio para quitar el globo "cargando"
    }else{
      alert("No Exite Pokemon con esa ID/Nombre")
      setMensaje("")
    }
  }

  //Al cargar la pagina, useEffect se encarga de mandar a llamar (en este caso) a la funcion; obtenerImagen
  //Ademas agregamos la funcionalidad de que siempre se mando a llamar a un pokemon (en este caso al primero)
  useEffect(() => {
    const poke = "1"
    obtenerImagen(poke);
    obtenerDatos(poke);
  }, []);


  //funciones para avanzar o retroceder
  const avanzar = () =>{
    console.log("el Boton Avanzar Funciona")
    const actualID = document.getElementById("id").textContent;
    const nuevaIDNumero = parseInt(actualID, 10);   //Esto se hace ya que al obtener el dato por getElementById lo obtenemos como string y para hacer el calculo lo necesitamos como int
    const nuevaID = nuevaIDNumero + 1;
    obtenerDatos(nuevaID);
    obtenerImagen(nuevaID);
  }

  const atras = () =>{
    console.log("el Boton Avanzar Funciona")
    const actualID = document.getElementById("id").textContent;
    const nuevaIDNumero = parseInt(actualID, 10);   //Esto se hace ya que al obtener el dato por getElementById lo obtenemos como string y para hacer el calculo lo necesitamos como int
    if (actualID > 1){
      const nuevaID = nuevaIDNumero - 1;
      obtenerDatos(nuevaID);
      obtenerImagen(nuevaID);
    }else{
      alert("No Puedes Retroceder Mas")
    }
  }

  const limpiarCasilla = () =>{
    document.getElementById("poke").value = "";
    console.log("Input Limpiado!")
  }


  return (
  <div>
    <div className="text-center p-6">

      {mensaje &&  //render condicional: solo muestra el <div> si mensaje tiene contenido.
        <div className='absolute z-50 top-[800px] border-2 p-3 bg-gray-300 text-gray-950 rounded-full font-bold
        left-1/2 -translate-x-1/2'>
          {mensaje}
        </div>
      }

      <h1 className="text-4xl font-bold text-gray-800">Pokedex</h1>

      {/* Relative en el contenedor, absolute en los elementos superpuestos.*/}
      {/* Contenedor imagen + contenido */}
      <div className="relative w-full max-w-[400px] h-[650px] bg-[#D32453] mx-auto border-4 border-gray-900 rounded-2xl shadow-2xl">

        <img
          className="w-full h-full object-cover rounded-2xl"
          src="sprites/PokeDex.svg"
          alt="pokedex"
        />

        <img
          className="absolute top-[110px] left-1/2 -translate-x-1/2 w-[90%] max-w-[350px] h-auto border-2 border-gray-900 rounded-xl"
          src="sprites/fondo.png"
          alt="img poke"
        />

        <img className='absolute top-[90px] left-1/2 -translate-x-1/2 w-2xl'
        src={spritesImg} alt="img poke" />

        <div className="absolute top-[470px] w-[90%] max-w-[350px] left-1/2 -translate-x-1/2 bg-[#636363] p-2 border-2 border-gray-950 rounded-[6px]">

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
                  <td className='px-6' id="id">{pokemon.id}</td>
                  <td className='px-6'>{pokemon.name}</td>
                  <td className='px-6'>{pokemon.types?.[0]?.type?.name}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <input id="poke" type="text" placeholder='Numero de pokemon'
            className="
            py-1 px-2 mt-2 border-2 bg-[#539A44] border-gray-950 rounded-[6px] w-full
            font-bold  text-gray-950 
            focus:bg-[#539A44] focus:outline-none
            autofill:bg-[#539A44] autofill:text-gray-950
            "/>

          <div className="justify-start float-left mt-2 flex gap-2">
            <button
              className="flex items-center justify-center w-10 h-10 bg-gray-800 text-gray-100 font-bold border-2 border-gray-950 rounded-full hover:bg-gray-600 hover:cursor-grab shadow-lg"
              aria-label="Atras"
              onClick={atras}
            >
              ⬅
            </button>

            <button
              className="flex items-center justify-center w-10 h-10 bg-gray-800 text-gray-100 font-bold border-2 border-gray-950 rounded-full hover:bg-gray-600 hover:cursor-grab shadow-lg"
              aria-label="Adelante"
              onClick={avanzar}
            >
              ➡
            </button>
          </div> 

          <div className="justify-end mt-2 flex gap-2">
            <button
              className="flex items-center justify-center w-10 h-10 bg-green-800 text-green-400 font-bold border-2 border-green-950 rounded-full hover:bg-green-600 hover:cursor-grab shadow-lg"
              aria-label="Aceptar"
              onClick={obtenerPokemon}
            >
              ✔
            </button>

            <button
              className="flex items-center justify-center w-10 h-10 bg-red-800 text-red-400 font-bold border-2 border-red-950 rounded-full hover:bg-red-600 hover:cursor-grab shadow-lg"
              aria-label="Cancelar"
              onClick={limpiarCasilla}
            >
              ✖
            </button>
          </div>

        </div>

      </div>

    </div>

  </div>
  )
}