import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Calendar, Users, Star } from 'lucide-react';
import { FavoritesContext } from './App';

const categoryIcons = {
  Religious: '⛪',
  Cultural: '🎨',
  Historical: '🏛️',
  Nature: '🌿',
};

const categoryColors = {
  Religious: 'bg-blue-100 text-blue-800',
  Cultural: 'bg-purple-100 text-purple-800',
  Historical: 'bg-yellow-100 text-yellow-800',
  Nature: 'bg-green-100 text-green-800',
};

const FestivalCard = ({ festival }) => {
  const { favorites, handleFavorite } = useContext(FavoritesContext);
  const idOrSlug = festival.slug || festival._id || festival.id;
  const favoriteKey = festival._id || festival.id || festival.slug;
  const isFavorite = favorites.has(favoriteKey);
  const categoryIcon = categoryIcons[festival.category];
  const categoryColor = categoryColors[festival.category];

  return (
    <div className="overflow-hidden bg-white rounded-lg border border-gray-200 shadow-sm hover-lift hover-glow transition-all duration-300">
      {/* Card Header with Gradient Background */}
      <div className="h-32 bg-gradient-to-br from-purple-200 via-blue-200 to-green-200 relative flex items-center justify-center">
        <div className="text-4xl animate-bounce-gentle">{categoryIcon}</div>
        <button
          onClick={() => handleFavorite(favoriteKey)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-all hover-scale"
        >
          <Heart className={`w-4 h-4 transition-all ${isFavorite ? 'fill-red-500 text-red-500 animate-pulse-slow' : 'text-gray-600 hover:text-red-400'}`} />
        </button>
        <span className={`absolute bottom-3 right-3 px-2.5 py-0.5 text-xs font-semibold rounded-full ${categoryColor} transition-all hover-scale`}>
          {festival.category?.toLowerCase()}
        </span>
      </div>

      <div className="p-4">
        <Link 
          to={`/festival/${idOrSlug}`}
          className="block hover:text-pink-600 transition-colors"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-pink-600 transition-colors">
            {festival.name}
          </h3>
        </Link>
        
        <div className="space-y-2 text-sm text-gray-600 mb-3">
          <div className="flex items-center hover-scale">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span>{festival.location}</span>
          </div>
          <div className="flex items-center hover-scale">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>{festival.month} {festival.year}</span>
          </div>
          {festival.expectedAttendees && (
            <div className="flex items-center hover-scale">
              <Users className="w-4 h-4 mr-2 text-gray-400" />
              <span>{Number(festival.expectedAttendees).toLocaleString()} expected</span>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 mb-4">
          {festival.description}
        </p>
      </div>

      <div className="px-4 pb-4 flex items-center justify-between">
        <div className="flex items-center">
          {festival.rating && (
            <>
              <Star className="w-4 h-4 text-yellow-400 fill-current animate-pulse-slow" />
              <span className="ml-1 text-sm font-medium text-gray-700">{festival.rating}</span>
            </>
          )}
        </div>
        <Link
          to={`/festival/${idOrSlug}`}
          className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-4 py-2 rounded-md font-medium transition-all hover-scale"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default FestivalCard;