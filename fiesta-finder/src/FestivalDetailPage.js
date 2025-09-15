import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { festivals as localFestivals } from './festival';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Heart, 
  Share2, 
  Clock,
  Info,
  Camera,
  Navigation
} from 'lucide-react';
import { FestivalsAPI } from './api';

const categoryIcons = {
  Religious: '⛪',
  Cultural: '🎨',
  Historical: '🏛️',
  Nature: '🌿',
};

const FestivalDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [festival, setFestival] = useState(null);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      try {
        const data = await FestivalsAPI.get(id);
        if (!ignore) setFestival(data);
      } catch (_) {
        const fallback = localFestivals.find(f => f.id === id);
        if (!ignore) setFestival(fallback || null);
      }
    };
    load();
    return () => { ignore = true; };
  }, [id]);

  if (!festival) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Festival Not Found</h1>
          <Link to="/" className="text-pink-600 hover:text-pink-700">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const categoryIcon = categoryIcons[festival.category];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-200 via-blue-200 to-green-200 h-96">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 p-3 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all hover-scale"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <div className="text-center w-full animate-slide-up">
            <div className="text-8xl mb-4 animate-bounce-gentle">{categoryIcon}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 gradient-text">
              {festival.name}
            </h1>
            <p className="text-xl text-white opacity-90">{festival.location}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              <div className="bg-white p-6 rounded-xl shadow-sm hover-lift hover-glow">
                <Calendar className="w-8 h-8 text-pink-500 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">When</h3>
                <p className="text-gray-600">{festival.month} {festival.year}</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover-lift hover-glow">
                <Users className="w-8 h-8 text-blue-500 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Expected Attendees</h3>
                <p className="text-gray-600">{festival.expectedAttendees?.toLocaleString() || 'TBA'}</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover-lift hover-glow">
                <Star className="w-8 h-8 text-yellow-500 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Rating</h3>
                <p className="text-gray-600">{festival.rating}/5.0</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-8 rounded-xl shadow-sm animate-slide-up hover-lift">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Info className="w-6 h-6 mr-3 text-pink-500" />
                About This Festival
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                {festival.description}
              </p>
              
              {/* Category Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full">
                <span className="mr-2">{categoryIcon}</span>
                {festival.category} Festival
              </div>
            </div>

            {/* Activities Section */}
            <div className="bg-white p-8 rounded-xl shadow-sm animate-slide-up hover-lift">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Camera className="w-6 h-6 mr-3 text-pink-500" />
                Festival Activities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {festival.category === 'Religious' && (
                  <>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900">Religious Processions</h4>
                      <p className="text-blue-700 text-sm">Traditional religious ceremonies and parades</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-900">Prayer Services</h4>
                      <p className="text-purple-700 text-sm">Special masses and devotional activities</p>
                    </div>
                  </>
                )}
                {festival.category === 'Cultural' && (
                  <>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900">Cultural Shows</h4>
                      <p className="text-green-700 text-sm">Traditional dances and performances</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-900">Local Crafts</h4>
                      <p className="text-yellow-700 text-sm">Handmade products and traditional arts</p>
                    </div>
                  </>
                )}
                {festival.category === 'Nature' && (
                  <>
                    <div className="p-4 bg-emerald-50 rounded-lg">
                      <h4 className="font-semibold text-emerald-900">Outdoor Activities</h4>
                      <p className="text-emerald-700 text-sm">Beach games and nature exploration</p>
                    </div>
                    <div className="p-4 bg-teal-50 rounded-lg">
                      <h4 className="font-semibold text-teal-900">Local Cuisine</h4>
                      <p className="text-teal-700 text sm">Fresh seafood and regional delicacies</p>
                    </div>
                  </>
                )}
                {festival.category === 'Historical' && (
                  <>
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-semibold text-amber-900">Historical Reenactments</h4>
                      <p className="text-amber-700 text-sm">Live performances of historical events</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-900">Cultural Education</h4>
                      <p className="text-orange-700 text-sm">Learn about local history and heritage</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Location Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover-lift hover-glow animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-pink-500" />
                Location
              </h3>
              <p className="text-gray-700 mb-4">{festival.location}</p>
              <button className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 px-4 rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all hover-scale flex items-center justify-center">
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </button>
            </div>

            {/* Schedule Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover-lift hover-glow animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-pink-500" />
                Schedule
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">
                    {festival.month === 'September' ? '1 Month' : 
                     festival.month === 'December' ? '1 Month' : 
                     '3-5 Days'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Best Time:</span>
                  <span className="font-medium">Morning</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 animate-slide-up">
              <button className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-4 px-6 rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all hover-scale font-semibold text-lg">
                Join Festival!
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-all hover-scale flex items-center justify-center">
                <Heart className="w-4 h-4 mr-2" />
                Add to Favorites
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-all hover-scale flex items-center justify-center">
                <Share2 className="w-4 h-4 mr-2" />
                Share Festival
              </button>
            </div>

            {/* Related Festivals */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover-lift animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Festivals</h3>
              <div className="space-y-3">
                {(localFestivals)
                  .filter(f => f.category === festival.category && (f.id || f.slug) !== (festival.id || festival.slug))
                  .slice(0, 3)
                  .map(relatedFestival => (
                    <Link
                      key={relatedFestival.id}
                      to={`/festival/${relatedFestival.id}`}
                      className="block p-3 border rounded-lg hover:bg-gray-50 transition-all hover-scale"
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{categoryIcons[relatedFestival.category]}</span>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{relatedFestival.name}</h4>
                          <p className="text-gray-500 text-xs">{relatedFestival.location}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalDetailPage;