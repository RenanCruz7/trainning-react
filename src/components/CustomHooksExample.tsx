import { useState, useEffect } from 'react';

// Hook personalizado para gerenciar um timer
function useTimer(initialSeconds = 0) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning) {
      interval = window.setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    
    // Função de limpeza para evitar memory leaks
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);
  
  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setSeconds(initialSeconds);
  };
  
  return { seconds, isRunning, start, pause, reset };
}

// Hook personalizado para gerenciar localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue] as const;
}

// Hook personalizado para buscar dados
function useFetch(url: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError(err as Error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
}

// Componente que utiliza os hooks personalizados
const CustomHooksExample = () => {
  // Usando o hook de timer
  const timer = useTimer();
  
  // Usando o hook de localStorage
  const [name, setName] = useLocalStorage<string>('name', '');
  
  // Usando o hook de fetch (URL de exemplo)
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos/1');
  
  return (
    <div className="hook-demo">
      <h2>Hooks Personalizados</h2>
      
      <div className="example-section">
        <h3>useTimer (Hook personalizado)</h3>
        <p>Tempo: {timer.seconds} segundos</p>
        <div>
          {!timer.isRunning ? (
            <button onClick={timer.start}>Iniciar</button>
          ) : (
            <button onClick={timer.pause}>Pausar</button>
          )}
          <button onClick={timer.reset}>Resetar</button>
        </div>
        <p>
          <strong>Explicação:</strong> Este hook personalizado encapsula a lógica de um timer,
          combinando useState e useEffect para criar uma API reutilizável.
        </p>
      </div>
      
      <div className="example-section">
        <h3>useLocalStorage (Hook personalizado)</h3>
        <input 
          type="text" 
          value={name} 
          onChange={e => setName(e.target.value)}
          placeholder="Digite seu nome (será salvo no localStorage)"
        />
        <p>Nome armazenado: {name}</p>
        <p>
          <strong>Explicação:</strong> Este hook personalizado facilita o uso do localStorage,
          sincronizando automaticamente o estado do React com o armazenamento local.
          Tente recarregar a página e veja que o valor persistirá!
        </p>
      </div>
      
      <div className="example-section">
        <h3>useFetch (Hook personalizado)</h3>
        {loading && <p>Carregando...</p>}
        {error && <p>Erro: {error.message}</p>}
        {data && (
          <div>
            <p>Dados carregados:</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
        <p>
          <strong>Explicação:</strong> Este hook personalizado encapsula a lógica de 
          busca de dados via API, gerenciando estados de carregamento e erros.
        </p>
      </div>
      
      <div className="example-section">
        <h3>Por que criar hooks personalizados?</h3>
        <ul>
          <li>Reutilizar lógica entre componentes</li>
          <li>Separar preocupações (ex: lógica de UI vs. lógica de dados)</li>
          <li>Compor funcionalidades complexas a partir de hooks simples</li>
          <li>Tornar o código mais legível e manutenível</li>
        </ul>
      </div>
    </div>
  );
};

export default CustomHooksExample;
