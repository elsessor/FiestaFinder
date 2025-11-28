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
import { ToastProvider } from './ToastContext';

export const AuthContext = createContext();
export const FavoritesContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  const handleFavorite = (festivalId) => {
    // Only allow favoriting if a user is signed in
    if (!user) {
      // Redirect to sign-in page and show a simple alert
      try { window.alert('Please sign in to add favorites.'); } catch (e) {}
      try { window.location.href = '/signin'; } catch (e) {}
      return;
    }

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

  const clearFavorites = () => {
    setFavorites(new Set());
    try { localStorage.removeItem('favorites'); } catch (e) {}
  };

  // Load favorites and user from localStorage on app start
  React.useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch (_) {}
    }
  }, []);

  return (
    <ToastProvider>
      <AuthContext.Provider value={{ user, setUser }}>
        <FavoritesContext.Provider value={{ favorites, handleFavorite, clearFavorites }}>
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
    </ToastProvider>
  );
}

export default App;