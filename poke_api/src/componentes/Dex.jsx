import React, { useEffect, useState } from 'react'

//Componente principal
export const Dex = () => {

     // Usamos un Estado para almacenar la URL de la imagen del Pokémon.
    const [spritesImg, setSpritesImg] = useState([]);


    //Funcion asincronioca para obtener la imagen
    const obtenerImagen = async () =>{
        
        const imagenSprite = []; //Declaramos un arreglo que nos ayudará a contener la imagen

        // Hacemos la petición HTTP a la API donde dicha peticion sera guardada en la variable "sprite"
        const sprite = await fetch("https://pokeapi.co/api/v2/pokemon-form/2/");

        //La peticion la convertiremos en un objeto JSON para poder acceder a sus propiedades (dicho formato se guardara en la variable imagenJson)
        const imagenJson = await sprite.json();

        //guardamos (o pusheamos ) en el arreglo, la imagen extraida (desde front_default)
        imagenSprite.push( imagenJson.sprites.front_default);

        //actualizamos el estado con la nueva imagen
        setSpritesImg( imagenSprite ) ;
    }

    //Al cargar la pagina, useEffect se encarga de mandar a llamar (en este caso) a la funcion; obtenerImagen 
    useEffect(() => {
        obtenerImagen();
    }, []);

    return (
        <div>
            <h1>Hola Mundo</h1>

            <button>Buscar</button>

            <input type="number" placeholder='Numero de pokemon' />

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
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <img src={spritesImg} alt="img poke" />
                        </td>
                    </tr>

                </tbody>
            </table>

        </div>
    )
}
