import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-pink-500 to-orange-500 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover Amazing Festivals
          </h1>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
            Explore the vibrant culture and celebrations of Camarines Sur, 
            Philippines. From religious processions to cultural parades, find your 
            next festival experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;