import { Moon, Sun } from 'lucide-react';

export default function Header({ theme, toggleTheme }) {
  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '1.5rem 5%', 
      backgroundColor: 'var(--clr-elements)',
      boxShadow: 'var(--box-shadow)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800' }}>Where in the world?</h1>
      
      <button onClick={toggleTheme} className="theme-button">
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    </header>
  );
}
