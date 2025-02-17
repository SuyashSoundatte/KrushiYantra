import React from 'react';
import { Cloud, Sun } from 'lucide-react';

const Card = () => {
  return (
    <div className="bg-blue-500 rounded-3xl p-4 text-white ">
      <div className="flex sm:flex-col items-center justify-center gap-3 md:space-y-2 ">
        {/* Day */}
        <h2 className="text-xl font-medium">
          {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
        </h2>
        
        {/* Weather Icon */}
        <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
          <Cloud className="w-20 h-20 md:w-24 md:h-24 text-white/90" />
          <Sun className="w-8 h-8 md:w-10 md:h-10 text-yellow-300 absolute top-0 right-0" />
        </div>
        
        {/* Temperature */}
        <div className="text-4xl font-bold">
          29°C
        </div>
        
        {/* Humidity */}
        <div className="text-lg text-white/90">
          Humidity 83%
        </div>
      </div>
    </div>
  );
};

export default Card;
