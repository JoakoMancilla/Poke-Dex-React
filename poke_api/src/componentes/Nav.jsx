import React from 'react'


export const Nav = () => {
  return (
    <nav className="bg-[#DE284B] text-white shadow-md">
      <div className="flex items-center justify-between max-w-6xl px-4 py-3 mx-auto">
        <h1 className="text-2xl font-bold select-none">Pokédex</h1>
        <ul className="hidden space-x-8 md:flex">
          <li>
            <a
              href="#home"
              className="font-medium transition-colors duration-300 hover:text-yellow-300"
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="#pokemon"
              className="font-medium transition-colors duration-300 hover:text-yellow-300"
            >
              Pokémon
            </a>
          </li>
          <li>
            <a
              href="#types"
              className="font-medium transition-colors duration-300 hover:text-yellow-300"
            >
              Tipos
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="font-medium transition-colors duration-300 hover:text-yellow-300"
            >
              Acerca
            </a>
          </li>
        </ul>
        {/* Menú para móvil (simple texto) */}
        <div className="font-semibold text-yellow-300 cursor-pointer md:hidden">
          Menú
        </div>
      </div>
    </nav>
  );
};