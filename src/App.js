import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import NotFound from './Pages/NotFound';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const users = [
      { email: "testuser@gmail.com", password: "testuser" },
      { email: "ishav@gmail.com", password: "ishav" },
      { email: "admin@gmail.com", password: "admin" },
    ];

    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
