import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="text-center w-full max-w-md mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-bold text-primary-600 leading-tight">
          Bem-Vindo ao FlowCot
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mt-4 mb-6">
          Estamos aqui para te ajudar!
        </h2>
       
        <div className="flex justify-center">
          <Link 
            to="/" 
            className="btn btn-primary flex items-center gap-2 px-6 py-3 text-sm sm:text-base"
          >
            <Home size={18} />
            Página Inicial
          </Link>
        </div>  
      </div>
    </div>
  );
};

export default NotFound;