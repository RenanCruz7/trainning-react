import { useReducer } from 'react';

// Definindo o estado inicial
const initialState = {
  count: 0,
  error: null as string | null,
  loading: false
};

// Definindo o reducer (função que atualiza o estado baseada nas ações)
function reducer(state: typeof initialState, action: { type: string; payload?: any }) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      // Não permite valores negativos
      if (state.count > 0) {
        return { ...state, count: state.count - 1, error: null };
      } else {
        return { ...state, error: 'O contador não pode ser menor que zero!' };
      }
    case 'reset':
      return { ...state, count: 0, error: null };
    case 'set_loading':
      return { ...state, loading: action.payload };
    case 'reset_error':
      return { ...state, error: null };
    default:
      throw new Error(`Ação não reconhecida: ${action.type}`);
  }
}

const ReducerExample = () => {
  // useReducer: Hook para estados complexos
  const [state, dispatch] = useReducer(reducer, initialState);
  
  // Simula uma operação assíncrona
  const delayedIncrement = () => {
    dispatch({ type: 'set_loading', payload: true });
    
    // Simula uma chamada API
    setTimeout(() => {
      dispatch({ type: 'increment' });
      dispatch({ type: 'set_loading', payload: false });
    }, 1500);
  };
  
  return (
    <div className="hook-demo">
      <h2>useReducer</h2>
      
      <div className="example-section">
        <h3>Exemplo de useReducer:</h3>
        <p>Contagem: {state.count}</p>
        
        <div>
          <button 
            onClick={() => dispatch({ type: 'increment' })}
            disabled={state.loading}
          >
            Incrementar
          </button>
          <button 
            onClick={() => dispatch({ type: 'decrement' })}
            disabled={state.loading}
          >
            Decrementar
          </button>
          <button 
            onClick={() => dispatch({ type: 'reset' })}
            disabled={state.loading}
          >
            Resetar
          </button>
          <button 
            onClick={delayedIncrement}
            disabled={state.loading}
          >
            {state.loading ? 'Carregando...' : 'Incrementar após 1.5s'}
          </button>
        </div>
        
        {state.error && (
          <div style={{ color: 'red', margin: '10px 0' }}>
            Erro: {state.error}
            <button 
              onClick={() => dispatch({ type: 'reset_error' })}
              style={{ marginLeft: '10px' }}
            >
              Fechar
            </button>
          </div>
        )}
        
        <p>
          <strong>Explicação:</strong> useReducer é útil para gerenciar estados mais complexos
          ou quando a lógica de atualização é mais sofisticada. Ele segue o padrão de 
          "ação + reducer" similar ao Redux, onde você despacha ações que o reducer
          processa para produzir o próximo estado.
        </p>
      </div>
    </div>
  );
};

export default ReducerExample;
