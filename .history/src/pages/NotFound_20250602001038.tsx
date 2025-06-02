import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-12 sm:py-16">
      <div className="text-center w-full max-w-2xl mx-auto px-4 sm:px-6">
        {/* Error Code */}
        <div className="mb-6 sm:mb-8">
          <span className="inline-block text-8xl sm:text-9xl font-bold text-primary-500/20">
           Bem-Vindo ao 
          </span>
        </div>
        
        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
        FlowCot
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-600 mb-8">
          Ops! Parece que você de ajuda, por isso estamos aqui para te ajudar! <span className="text-primary-600">FlowCot!</span>
        </p>
        
        {/* Description */}
       
        
        {/* Home Button */}
        <div className="flex justify-center">
          <Link 
            to="/" 
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <Home className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span className="text-sm sm:text-base">Ir à Página Inicial</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;