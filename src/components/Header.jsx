import React from 'react';

const Header = ({ theme, toggleTheme }) => {
  return (
    <header>
      <h1>Pixel Engine</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  );
};

export default Header;