import { useState, useRef, useCallback, useMemo } from 'react';

const AdvancedHooks = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [items, setItems] = useState<string[]>([]);
  
  // useRef: guarda um valor mutável que persiste entre renderizações
  const inputRef = useRef<HTMLInputElement>(null);
  const renderCount = useRef(0);
  
  // Contador de renderizações
  renderCount.current++;
  
  // useCallback: memoriza uma função
  const handleAddItem = useCallback(() => {
    if (text.trim() === '') return;
    setItems(prevItems => [...prevItems, text]);
    setText('');
    
    // Foca o input após adicionar um item
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [text]);
  
  // useMemo: memoriza um valor calculado
  const expensiveCalculation = useMemo(() => {
    console.log('Calculando...');
    // Simula um cálculo pesado
    let result = 0;
    for (let i = 0; i < count * 100; i++) {
      result += i;
    }
    return result;
  }, [count]);
  
  // Exemplo de uso direto do useRef para acessar o DOM
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <div className="hook-demo">
      <h2>Hooks Avançados</h2>
      
      <div className="example-section">
        <h3>useRef</h3>
        <p>Renderizações: {renderCount.current}</p>
        
        <div>
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Digite um item"
          />
          <button onClick={handleAddItem}>
            Adicionar Item
          </button>
          <button onClick={focusInput}>
            Focar no input (useRef para acessar DOM)
          </button>
        </div>
        
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        
        <p>
          <strong>Explicação useRef:</strong> Útil para acessar elementos DOM diretamente
          ou para manter valores entre renderizações sem causar novas renderizações 
          (como o contador de renderizações acima).
        </p>
      </div>
      
      <div className="example-section">
        <h3>useCallback e useMemo</h3>
        <p>Contador: {count}</p>
        <button onClick={() => setCount(c => c + 1)}>
          Incrementar Contador
        </button>
        
        <p>Resultado do cálculo "pesado": {expensiveCalculation}</p>
        
        <p>
          <strong>Explicação useMemo:</strong> Memoriza o resultado de um cálculo pesado
          para evitar recalculá-lo em cada renderização. Só recalcula quando as dependências mudam.
        </p>
        
        <p>
          <strong>Explicação useCallback:</strong> Similar ao useMemo, mas para funções.
          Impede que funções sejam recriadas em cada renderização, o que é útil quando
          passamos funções para componentes filhos otimizados (com React.memo).
        </p>
      </div>
    </div>
  );
};

export default AdvancedHooks;
