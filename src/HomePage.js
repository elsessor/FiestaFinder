import React, { useState, useMemo } from 'react';
import HeroSection from './HeroSection';
import FilterSection from './FilterSection';
import FestivalCard from './FestivalCard';
import { useAdmin } from './AdminContext';
import { Star } from 'lucide-react';

const HomePage = () => {
  const { festivals } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState('All Festivals');
  const [selectedMonth, setSelectedMonth] = useState('All Year');
  const [searchQuery, setSearchQuery] = useState('');

  // Get featured festivals dynamically
  const featuredFestivals = festivals.filter(f =>
    ['penafrancia-festival', 'kaogma-festival', 'cimarrones-festival', 'boa-boahan-festival', 'karanowan-fish-tival', 'tinagba-festival'].includes(f.id)
  );

  const filteredFestivals = useMemo(() => {
    return festivals.filter(festival => {
      const matchesCategory = selectedCategory === 'All Festivals' || festival.category === selectedCategory;
      const matchesMonth = selectedMonth === 'All Year' || festival.month === selectedMonth;
      const matchesSearch = festival.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           festival.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           festival.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesMonth && matchesSearch;
    });
  }, [festivals, selectedCategory, selectedMonth, searchQuery]);


  return (
    <>
      <HeroSection onSearch={setSearchQuery} />
      <FilterSection
        selectedCategory={selectedCategory}
        selectedMonth={selectedMonth}
        onCategoryChange={setSelectedCategory}
        onMonthChange={setSelectedMonth}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Festivals Section */}
        {selectedCategory === 'All Festivals' && selectedMonth === 'All Year' && !searchQuery && (
          <section className="mb-16 animate-slide-up">
            <div className="flex items-center mb-8">
              <Star className="w-6 h-6 text-yellow-500 mr-3 animate-bounce-gentle" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Festivals of Camarines Sur</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredFestivals.map((festival, index) => (
                <div key={festival.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <FestivalCard
                    festival={festival}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Festivals Section */}
        <section className="animate-slide-up">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory !== 'All Festivals' || selectedMonth !== 'All Year' || searchQuery 
                ? 'Filtered Results' 
                : 'All Festivals'
              }
            </h2>
            <span className="text-sm text-gray-500 animate-pulse-slow">
              {filteredFestivals.length} festival{filteredFestivals.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {filteredFestivals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFestivals.map((festival, index) => (
                <div key={festival.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <FestivalCard
                    festival={festival}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 animate-fade-in">
              <div className="text-gray-400 mb-4">
                <span className="text-4xl animate-bounce-gentle">🎭</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No festivals found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms to find more festivals.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default HomePage;