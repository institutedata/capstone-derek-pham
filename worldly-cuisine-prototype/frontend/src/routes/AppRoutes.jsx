import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage.jsx';
import QuizPage from '../pages/QuizPage/QuizPage.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz" element={<QuizPage />} />
    </Routes>
  );
};

export default AppRoutes;
