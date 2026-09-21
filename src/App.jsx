import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './index.css';

import Header from './components/Header';
import Home from './pages/Home';
import Detail from './pages/Detail';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:code" element={<Detail />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
