import React, { createContext, useContext, useState, useEffect } from 'react';
import { festivals as initialFestivals } from './festival';
import { FestivalsAPI } from './api';

const AdminContext = createContext();

// Default super admin credentials (in production, this would be handled by a backend)
const SUPER_ADMIN_CREDENTIALS = {
  username: 'superadmin',
  password: 'fiesta2025!'
};

export const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [festivals, setFestivals] = useState(initialFestivals);
  const [adminLoading, setAdminLoading] = useState(false);

  // Check if admin is logged in on app start
  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession === 'true') {
      setIsAdminLoggedIn(true);
    }

    // Load festivals from localStorage if available
    const savedFestivals = localStorage.getItem('festivals');
    if (savedFestivals) {
      try {
        setFestivals(JSON.parse(savedFestivals));
      } catch (error) {
        console.error('Error loading festivals from localStorage:', error);
      }
    }
  }, []);

  // Save festivals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('festivals', JSON.stringify(festivals));
  }, [festivals]);

  const adminLogin = async (username, password) => {
    setAdminLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === SUPER_ADMIN_CREDENTIALS.username && password === SUPER_ADMIN_CREDENTIALS.password) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('adminSession', 'true');
      setAdminLoading(false);
      return { success: true };
    } else {
      setAdminLoading(false);
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('adminSession');
  };

  const addFestival = async (festivalData) => {
    // Normalize payload
    const payload = {
      ...festivalData,
      expectedAttendees: parseInt(festivalData.expectedAttendees) || 0,
      imageUrl: Array.isArray(festivalData.imagePreviews) && festivalData.imagePreviews.length > 0
        ? festivalData.imagePreviews[0]
        : (festivalData.imagePreview || '')
    };

    // Try backend create first
    try {
      const created = await FestivalsAPI.create(payload);
      // ensure local admin state includes it
      setFestivals(prev => [...prev, created]);
      return created;
    } catch (e) {
      // fallback to local-only festival
      const newFestival = {
        ...payload,
        id: generateFestivalId(payload.name || `festival-${Date.now()}`),
        year: new Date().getFullYear(),
        rating: 0
      };
      setFestivals(prev => [...prev, newFestival]);
      return newFestival;
    }
  };

  const updateFestival = async (festivalId, updatedData) => {
    // If festivalId looks like a backend _id, attempt backend update
    try {
      const backendId = updatedData._id || updatedData.id || festivalId;
      const payload = {
        ...updatedData,
        expectedAttendees: updatedData.expectedAttendees ? parseInt(updatedData.expectedAttendees) : undefined,
        imageUrl: Array.isArray(updatedData.imagePreviews) && updatedData.imagePreviews.length > 0
          ? updatedData.imagePreviews[0]
          : (updatedData.imagePreview || updatedData.imageUrl)
      };
      // If backend id resembles Mongo _id (24 hex chars) or contains _id, attempt update
      if (String(backendId).match(/^[0-9a-fA-F]{24}$/)) {
        const updated = await FestivalsAPI.update(backendId, payload);
        setFestivals(prev => prev.map(f => (f._id === backendId || f.id === backendId ? { ...f, ...updated } : f)));
        return updated;
      }
    } catch (e) {
      // ignore and fallback to local update
    }

    // local update fallback
    setFestivals(prev =>
      prev.map(festival =>
        festival.id === festivalId
          ? {
              ...festival,
              ...updatedData,
              imageUrls:
                updatedData.imagePreviews !== undefined
                  ? [...updatedData.imagePreviews]
                  : (updatedData.imagePreview !== undefined
                      ? (updatedData.imagePreview ? [updatedData.imagePreview] : festival.imageUrls || [])
                      : (festival.imageUrls || []))
            }
          : festival
      )
    );
    return null;
  };

  const deleteFestival = async (festivalIdOrObj) => {
    // Accept either festival id or festival object
    const id = typeof festivalIdOrObj === 'string' ? festivalIdOrObj : (festivalIdOrObj._id || festivalIdOrObj.id);

    // If id is a backend _id try deleting remotely
    try {
      if (String(id).match(/^[0-9a-fA-F]{24}$/)) {
        await FestivalsAPI.delete(id);
        setFestivals(prev => prev.filter(f => f._id !== id && f.id !== id));
        return true;
      }
    } catch (e) {
      // ignore and fallback to local delete
    }

    setFestivals(prev => prev.filter(festival => festival.id !== id && festival._id !== id));
    return true;
  };

  const getFestivalById = (id) => {
    return festivals.find(festival => festival.id === id || festival._id === id || String(festival.id) === String(id));
  };

  // Helper function to generate festival ID from name
  const generateFestivalId = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const value = {
    // Admin Auth
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    adminLoading,

    // Festival Management
    festivals,
    addFestival,
    updateFestival,
    deleteFestival,
    getFestivalById,

    // Credentials for display (remove in production)
    SUPER_ADMIN_CREDENTIALS
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};