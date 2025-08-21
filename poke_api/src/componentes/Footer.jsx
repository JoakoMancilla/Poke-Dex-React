import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-[#DE284B] text-white shadow-md mt-8 ">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm select-none mx-auto">
          &copy; {new Date().getFullYear()} Pokédex. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};