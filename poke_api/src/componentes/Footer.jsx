import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-[#DE284B] text-white shadow-md mt-8 ">
      <div className="flex flex-col items-center justify-between max-w-6xl px-4 py-6 mx-auto md:flex-row">
        <p className="mx-auto text-sm select-none">
          &copy; {new Date().getFullYear()} Pokédex. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};