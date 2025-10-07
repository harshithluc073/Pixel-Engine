import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ApiKeyGate from './components/ApiKeyGate';

function App() {
  const [theme, setTheme] = useState('light');
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    const storedApiKey = localStorage.getItem('nano-banana-api-key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleApiKeySubmit = (key) => {
    localStorage.setItem('nano-banana-api-key', key);
    setApiKey(key);
  };

  if (!apiKey) {
    return <ApiKeyGate onApiKeySubmit={handleApiKeySubmit} />;
  }

  return (
    <div className={`app ${theme}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;