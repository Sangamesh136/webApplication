import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import VehicleSearch from './components/dashboard/VehicleSearch';
import NotificationList from './components/notifications/NotificationList';
import ProfilePage from './components/profile/ProfilePage';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                  <Routes>
                    <Route path="/dashboard" element={<VehicleSearch />} />
                    <Route path="/notifications" element={<NotificationList />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;