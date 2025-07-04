import { createContext, useContext, useState } from 'react';

// Criando um contexto
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

// Componente filho que consome o contexto
const ThemedButton = () => {
  // useContext: Hook para acessar o contexto
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      onClick={toggleTheme}
      style={{ 
        background: theme === 'light' ? '#ffffff' : '#333333',
        color: theme === 'light' ? '#333333' : '#ffffff',
        padding: '10px 15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Mudar para tema {theme === 'light' ? 'escuro' : 'claro'}
    </button>
  );
};

// Componente intermediário
const Toolbar = () => {
  return (
    <div className="toolbar" style={{ margin: '10px 0' }}>
      <ThemedButton />
    </div>
  );
};

// Componente principal que fornece o contexto
const ContextExample = () => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <div className="hook-demo">
      <h2>useContext</h2>
      
      <div className="example-section">
        <h3>Exemplo de useContext:</h3>
        <p>Tema atual: {theme}</p>
        
        {/* Provedor de contexto */}
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <Toolbar />
        </ThemeContext.Provider>
        
        <p>
          <strong>Explicação:</strong> useContext permite que componentes acessem dados do contexto
          sem precisar passar props manualmente através de cada nível. 
          No exemplo acima, ThemedButton acessa o tema diretamente do contexto.
        </p>
      </div>
    </div>
  );
};

export default ContextExample;
