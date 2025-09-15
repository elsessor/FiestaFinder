import React from 'react';
import { Heart, MapPin, Mail, ExternalLink, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🏛️</span>
              </div>
              <span className="text-lg font-bold text-gray-900">Fiesta Finder</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Discover and celebrate the vibrant festivals of Camarines Sur, Philippines. 
              Connecting tradition with technology.
            </p>
            <div className="flex items-center text-sm text-gray-600">
              <Heart className="w-4 h-4 text-pink-500 mr-1" />
              <span>Made with love by Agad Co.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-pink-600 transition-colors">Home</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-pink-600 transition-colors">My Favorites</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-pink-600 transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Festival Categories */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Festival Categories</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">⛪</span>
                <a href="#" className="text-sm text-gray-600 hover:text-pink-600 transition-colors">Religious Festivals</a>
              </li>
              <li className="flex items-center">
                <span className="mr-2">🎨</span>
                <a href="#" className="text-sm text-gray-600 hover:text-pink-600 transition-colors">Cultural Events</a>
              </li>
              <li className="flex items-center">
                <span className="mr-2">🏛️</span>
                <a href="#" className="text-sm text-gray-600 hover:text-pink-600 transition-colors">Historical Celebrations</a>
              </li>
              <li className="flex items-center">
                <span className="mr-2">🌿</span>
                <a href="#" className="text-sm text-gray-600 hover:text-pink-600 transition-colors">Nature Festivals</a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Connect</h4>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Camarines Sur, Philippines</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:hello@fiestafinder.ph" className="hover:text-pink-600 transition-colors">
                  hello@fiestafinder.ph
                </a>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <ExternalLink className="w-4 h-4 mr-2" />
                <a href="#" className="hover:text-pink-600 transition-colors flex items-center">
                  View on Map
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-900 mb-3">Follow Us</p>
              <div className="flex space-x-3">
                <a href="#" className="p-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg hover:from-pink-600 hover:to-orange-600 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Discover Festivals Link */}
            <div className="mt-6">
              <a href="#" className="inline-flex items-center text-sm text-pink-600 hover:text-pink-700 transition-colors">
                Discover Festivals
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© 2025 Agad Co. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;