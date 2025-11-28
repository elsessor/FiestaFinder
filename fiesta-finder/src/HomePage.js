import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from './HeroSection';
import FilterSection from './FilterSection';
import FestivalCard from './FestivalCard';
import { festivals as localFestivals, featuredFestivals as localFeatured } from './festival';
import { Star } from 'lucide-react';
import { FestivalsAPI } from './api';
import { useAdmin } from './AdminContext';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Festivals');
  const [selectedMonth, setSelectedMonth] = useState('All Year');
  const [searchQuery, setSearchQuery] = useState('');
  const [remoteFestivals, setRemoteFestivals] = useState(null);
  const [loading, setLoading] = useState(false);
  const { festivals: adminFestivals } = useAdmin();



  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await FestivalsAPI.list();
        if (!ignore) setRemoteFestivals(data);
      } catch (_) {
        if (!ignore) setRemoteFestivals(null);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchData();
    return () => { ignore = true; };
  }, []);

  // Read `search` query param from URL so header searches navigate to HomePage correctly
  const location = useLocation();
  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const q = params.get('search') || '';
      setSearchQuery(q);
    } catch (e) {
      // ignore
    }
  }, [location.search]);

  const useLocalFallback = Array.isArray(remoteFestivals) && remoteFestivals.length === 0 && selectedCategory === 'All Festivals' && selectedMonth === 'All Year' && !searchQuery;
  const remote = Array.isArray(remoteFestivals) ? remoteFestivals : [];
  // Merge local seed data, admin-managed festivals, and remote DB items,
  // de-duplicated by slug/_id/name so newly added festivals show alongside local ones
  const mergedFestivals = (() => {
    const map = new Map();
    const add = (f) => {
      const key = f.slug || f._id || f.id || f.name;
      if (!map.has(key)) map.set(key, f);
    };
    localFestivals.forEach(add);
    // include admin-managed festivals (stored in local state / localStorage)
    Array.isArray(adminFestivals) && adminFestivals.forEach(add);
    remote.forEach(add);
    return Array.from(map.values());
  })();
  const sourceFestivals = useLocalFallback ? localFestivals : mergedFestivals;
  const featuredFestivals = localFeatured;

  const filteredFestivals = useMemo(() => {
    const normalize = (s) => (s || '').toString().trim();
    const search = normalize(searchQuery).toLowerCase();

    return sourceFestivals.filter(festival => {
      const category = normalize(festival.category);
      const month = normalize(festival.month);
      const matchesCategory = selectedCategory === 'All Festivals' || category === selectedCategory;
      const matchesMonth = selectedMonth === 'All Year' || month === selectedMonth;
      const matchesSearch = (!search) ||
        normalize(festival.name).toLowerCase().includes(search) ||
        normalize(festival.location).toLowerCase().includes(search) ||
        normalize(festival.description).toLowerCase().includes(search);
      return matchesCategory && matchesMonth && matchesSearch;
    });
  }, [sourceFestivals, selectedCategory, selectedMonth, searchQuery]);

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
                <div key={festival._id || festival.id || festival.slug || `${festival.name}-${index}`} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
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
              {loading ? 'Loading…' : `${filteredFestivals.length} festival${filteredFestivals.length !== 1 ? 's' : ''} found`}
            </span>
          </div>

          {filteredFestivals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFestivals.map((festival, index) => (
                <div key={festival._id || festival.id || festival.slug || `${festival.name}-${index}`} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
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