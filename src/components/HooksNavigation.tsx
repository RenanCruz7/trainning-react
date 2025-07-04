import { useState } from 'react';
import HookBasics from './HookBasics';
import ContextExample from './ContextExample';
import ReducerExample from './ReducerExample';
import AdvancedHooks from './AdvancedHooks';
import CustomHooksExample from './CustomHooksExample';

const HooksNavigation = () => {
  const [activeTab, setActiveTab] = useState('basics');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'basics':
        return <HookBasics />;
      case 'context':
        return <ContextExample />;
      case 'reducer':
        return <ReducerExample />;
      case 'advanced':
        return <AdvancedHooks />;
      case 'custom':
        return <CustomHooksExample />;
      default:
        return <HookBasics />;
    }
  };
  
  return (
    <div className="hooks-container">
      <h1>Treinamento React Hooks</h1>
      
      <div className="hooks-navigation">
        <button 
          className={activeTab === 'basics' ? 'active' : ''}
          onClick={() => setActiveTab('basics')}
        >
          useState & useEffect
        </button>
        <button 
          className={activeTab === 'context' ? 'active' : ''}
          onClick={() => setActiveTab('context')}
        >
          useContext
        </button>
        <button 
          className={activeTab === 'reducer' ? 'active' : ''}
          onClick={() => setActiveTab('reducer')}
        >
          useReducer
        </button>
        <button 
          className={activeTab === 'advanced' ? 'active' : ''}
          onClick={() => setActiveTab('advanced')}
        >
          useRef, useCallback & useMemo
        </button>
        <button 
          className={activeTab === 'custom' ? 'active' : ''}
          onClick={() => setActiveTab('custom')}
        >
          Hooks Personalizados
        </button>
      </div>
      
      <div className="hooks-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default HooksNavigation;
