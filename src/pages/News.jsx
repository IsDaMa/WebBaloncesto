import React, { useState } from 'react';
import { news } from '../data/news';

const News = () => {
  const [filter, setFilter] = useState('all');
  
  const categories = [
    { id: 'all', name: 'Todas' },
    { id: 'results', name: 'Resultados' },
    { id: 'team', name: 'Equipo' },
    { id: 'club', name: 'Club' }
  ];
  
  const filteredNews = filter === 'all' 
    ? news 
    : news.filter(item => item.category === filter);
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-deepGreen mb-2">Noticias</h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-4"></div>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Mantente al día con las últimas noticias, resultados y eventos del CB Cártama.
          </p>
        </div>
        
        {/* Filter Tabs */}
        <div className="mb-8 flex flex-wrap justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 mx-1 mb-2 rounded-full text-sm md:text-base font-medium transition-colors ${
                filter === category.id 
                  ? 'bg-deepGreen text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map(item => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              {/* News Image */}
              <div className="aspect-w-16 aspect-h-9 relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="object-cover w-full h-48"
                />
                <div className="absolute top-0 right-0 bg-gold text-white text-xs font-bold px-3 py-1 m-2 rounded">
                  {item.category === 'results' ? 'Resultados' : 
                   item.category === 'team' ? 'Equipo' : 
                   item.category === 'club' ? 'Club' : 'Noticia'}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4 md:p-6">
                <div className="mb-2 text-gray-500 text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(item.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <h3 className="text-xl font-bold text-deepGreen mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{item.summary}</p>
                <button className="text-gold hover:text-amber-600 font-medium flex items-center transition-colors">
                  Leer más 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="inline-flex rounded-md shadow-sm">
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Anterior</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-deepGreen text-sm font-medium text-white hover:bg-[#0A3A1D]"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              2
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              8
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Siguiente</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default News;