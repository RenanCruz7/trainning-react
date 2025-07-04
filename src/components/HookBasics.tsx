import { useState, useEffect } from 'react';

// Componente demonstrando useState e useEffect
const HookBasics = () => {
  // useState: Hook para gerenciar estado
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // useEffect: Hook para efeitos colaterais
  // Este useEffect será executado após cada renderização
  useEffect(() => {
    document.title = `Você clicou ${count} vezes`;
  });
  
  // Este useEffect será executado apenas quando count mudar
  useEffect(() => {
    console.log(`O contador mudou para: ${count}`);
    
    // Função de limpeza (cleanup)
    return () => {
      console.log(`Limpando efeito anterior. Valor antigo: ${count}`);
    };
  }, [count]); // Array de dependências
  
  // Este useEffect será executado apenas uma vez (na montagem)
  useEffect(() => {
    console.log('Componente montado - similar ao componentDidMount');
    
    // Função de limpeza executada na desmontagem
    return () => {
      console.log('Componente será desmontado - similar ao componentWillUnmount');
    };
  }, []); // Array de dependências vazio
  
  return (
    <div className="hook-demo">
      <h2>useState e useEffect</h2>
      
      <div className="example-section">
        <h3>Exemplo de useState:</h3>
        <p>Contagem: {count}</p>
        <button onClick={() => setCount(count + 1)}>
          Incrementar
        </button>
        <button onClick={() => setCount(count - 1)}>
          Decrementar
        </button>
        <button onClick={() => setCount(0)}>
          Resetar
        </button>
      </div>
      
      <div className="example-section">
        <h3>Exemplo de formulário com useState:</h3>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome"
        />
        {name && <p>Olá, {name}!</p>}
      </div>
      
      <div className="example-section">
        <h3>Sobre useEffect:</h3>
        <p>O título da página muda a cada clique no contador.</p>
        <p>Observe o console para ver os logs dos diferentes useEffect.</p>
      </div>
    </div>
  );
};

export default HookBasics;
