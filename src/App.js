import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import FestivalDetailPage from './FestivalDetailPage';
import AboutPage from './AboutPage';
import SignInPage from './SignInPage';
import AddFestivalPage from './AddFestivalPage';
import FavoritesPage from './FavoritesPage';
import MapPage from './MapPage';


export const AuthContext = createContext();
export const FavoritesContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  const handleFavorite = (festivalId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(festivalId)) {
        newFavorites.delete(festivalId);
      } else {
        newFavorites.add(festivalId);
      }
      // Save to localStorage
      localStorage.setItem('favorites', JSON.stringify([...newFavorites]));
      return newFavorites;
    });
  };

  // Load favorites from localStorage on app start
  React.useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <FavoritesContext.Provider value={{ favorites, handleFavorite }}>
        <Router>
          <div className="min-h-screen bg-white">
            <Header />
            <main className="animate-fade-in">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/festival/:id" element={<FestivalDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/add-festival" element={<AddFestivalPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/map" element={<MapPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </FavoritesContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;