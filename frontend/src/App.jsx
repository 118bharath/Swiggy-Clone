import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminRoute from './components/AdminRoute';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ManageMenuPage from './pages/ManageMenuPage';
import RestaurantMenuPage from './pages/RestaurantMenuPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/restaurant/:id" element={<RestaurantMenuPage/>}/>
            <Route path="/admin" element={<AdminRoute/>}>
            <Route path="dashboard" element={<AdminDashboardPage/>}/>
            <Route path="restaurant/:restaurantId/menu" element={<ManageMenuPage/>}/>
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;