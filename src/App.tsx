import { useState } from 'react'
import './App.css'
import HooksNavigation from './components/HooksNavigation'
import './components/HooksDemo.css'

function App() {
  const [showDemo, setShowDemo] = useState(false)

  // Mostra a página inicial ou a demonstração de hooks
  return showDemo ? (
    <HooksNavigation />
  ) : (
    <>
      <h1>Treinamento React Hooks</h1>
      <div className="card">
        <button onClick={() => setShowDemo(true)}>
          Iniciar Demonstração de Hooks
        </button>
        <p>
          Clique no botão acima para explorar os exemplos de React Hooks
        </p>
      </div>
      <p className="read-the-docs">
        React Hooks permitem que você utilize recursos do React em componentes funcionais
      </p>
    </>
  )
}

export default App
