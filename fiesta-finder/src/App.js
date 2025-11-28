import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import FestivalDetailPage from './FestivalDetailPage';
import AboutPage from './AboutPage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import AddFestivalPage from './AddFestivalPage';
import FavoritesPage from './FavoritesPage';
import MapPage from './MapPage';
import { ToastProvider } from './ToastContext';
import SuperAdminLogin from './SuperAdminLogin';
import SuperAdminDashboard from './SuperAdminDashboard';
import AdminAddFestival from './AdminAddFestival';
import AdminEditFestival from './AdminEditFestival';
import { AdminProvider } from './AdminContext';

export const AuthContext = createContext();
export const FavoritesContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  const handleFavorite = (festivalId) => {
    if (!user) {
      try { window.alert('Please sign in to add favorites.'); } catch (e) {}
      try { window.location.href = '/signin'; } catch (e) {}
      return;
    }
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(festivalId)) newFavorites.delete(festivalId);
      else newFavorites.add(festivalId);
      try { localStorage.setItem('favorites', JSON.stringify([...newFavorites])); } catch (e) {}
      return newFavorites;
    });
  };

  const clearFavorites = () => {
    setFavorites(new Set());
    try { localStorage.removeItem('favorites'); } catch (e) {}
  };

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try { setFavorites(new Set(JSON.parse(savedFavorites))); } catch (e) {}
    }
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch (e) {}
    }
  }, []);

  return (
    <ToastProvider>
      <AdminProvider>
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
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/add-festival" element={<AddFestivalPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/map" element={<MapPage />} />
                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<SuperAdminLogin />} />
                    <Route path="/admin/dashboard" element={<SuperAdminDashboard />} />
                    <Route path="/admin/add-festival" element={<AdminAddFestival />} />
                    <Route path="/admin/edit-festival/:id" element={<AdminEditFestival />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </FavoritesContext.Provider>
        </AuthContext.Provider>
      </AdminProvider>
    </ToastProvider>
  );
}

export default App;