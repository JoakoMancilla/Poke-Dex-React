import React from 'react'


export const Nav = () => {
  return (
    <nav className="bg-[#DE284B] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold select-none">Pokédex</h1>
        <ul className="hidden md:flex space-x-8">
          <li>
            <a
              href="#home"
              className="hover:text-yellow-300 transition-colors duration-300 font-medium"
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="#pokemon"
              className="hover:text-yellow-300 transition-colors duration-300 font-medium"
            >
              Pokémon
            </a>
          </li>
          <li>
            <a
              href="#types"
              className="hover:text-yellow-300 transition-colors duration-300 font-medium"
            >
              Tipos
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="hover:text-yellow-300 transition-colors duration-300 font-medium"
            >
              Acerca
            </a>
          </li>
        </ul>
        {/* Menú para móvil (simple texto) */}
        <div className="md:hidden text-yellow-300 font-semibold cursor-pointer">
          Menú
        </div>
      </div>
    </nav>
  );
};