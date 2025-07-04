import { useState, useRef, useCallback, useMemo } from 'react';
import { 
  Typography, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Paper, 
  Box, 
  Card, 
  CardContent, 
  CardHeader, 
  Divider, 
  Chip, 
  Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import CodeIcon from '@mui/icons-material/Code';
import CalculateIcon from '@mui/icons-material/Calculate';
import FunctionsIcon from '@mui/icons-material/Functions';
import { blue, purple, teal } from '@mui/material/colors';

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
    <Box sx={{ maxWidth: '100%', mb: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ 
        color: blue[700],
        borderBottom: `2px solid ${blue[400]}`,
        pb: 1,
        mb: 3
      }}>
        Hooks Avançados
      </Typography>
      
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardHeader 
          title={
            <Stack direction="row" spacing={1} alignItems="center">
              <CodeIcon color="primary" />
              <Typography variant="h5">useRef</Typography>
            </Stack>
          }
          sx={{ backgroundColor: blue[50] }}
        />
        <CardContent>
          <Chip 
            label={`Renderizações: ${renderCount.current}`} 
            color="primary" 
            sx={{ mb: 2 }}
          />
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
            <TextField
              inputRef={inputRef}
              label="Digite um item"
              value={text}
              onChange={e => setText(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
            />
            <Button 
              variant="contained" 
              onClick={handleAddItem} 
              startIcon={<AddIcon />}
            >
              Adicionar
            </Button>
            <Button 
              variant="outlined" 
              onClick={focusInput}
              startIcon={<TouchAppIcon />}
            >
              Focar no Input
            </Button>
          </Stack>
          
          <Paper variant="outlined" sx={{ maxHeight: 200, overflow: 'auto', mb: 2 }}>
            <List dense>
              {items.length === 0 ? (
                <ListItem>
                  <ListItemText primary="Nenhum item adicionado" secondary="Adicione itens acima" />
                </ListItem>
              ) : (
                items.map((item, index) => (
                  <ListItem key={index} divider={index !== items.length - 1}>
                    <ListItemText primary={item} secondary={`Item #${index + 1}`} />
                  </ListItem>
                ))
              )}
            </List>
          </Paper>
          
          <Paper sx={{ p: 2, backgroundColor: teal[50], borderLeft: `4px solid ${teal[300]}` }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: teal[800] }}>
              Explicação useRef:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Útil para acessar elementos DOM diretamente ou para manter valores entre renderizações 
              sem causar novas renderizações (como o contador de renderizações acima).
            </Typography>
          </Paper>
        </CardContent>
      </Card>
      
      <Card elevation={3}>
        <CardHeader 
          title={
            <Stack direction="row" spacing={1} alignItems="center">
              <CalculateIcon sx={{ color: purple[500] }} />
              <Typography variant="h5">useCallback e useMemo</Typography>
            </Stack>
          }
          sx={{ backgroundColor: purple[50] }}
        />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { sm: 'center' }, mb: 3 }}>
            <Typography variant="h6">Contador: {count}</Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={() => setCount(c => c + 1)}
            >
              Incrementar
            </Button>
          </Box>
          
          <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, mb: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <FunctionsIcon color="secondary" />
              <Typography variant="subtitle1">Resultado do cálculo "pesado":</Typography>
            </Stack>
            <Typography variant="h5" sx={{ fontFamily: 'monospace' }}>{expensiveCalculation}</Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Paper sx={{ p: 2, backgroundColor: purple[50], borderLeft: `4px solid ${purple[300]}`, mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: purple[800] }}>
              Explicação useMemo:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Memoriza o resultado de um cálculo pesado para evitar recalculá-lo 
              em cada renderização. Só recalcula quando as dependências mudam.
            </Typography>
          </Paper>
          
          <Paper sx={{ p: 2, backgroundColor: purple[50], borderLeft: `4px solid ${purple[300]}` }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: purple[800] }}>
              Explicação useCallback:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Similar ao useMemo, mas para funções. Impede que funções sejam recriadas 
              em cada renderização, o que é útil quando passamos funções para componentes 
              filhos otimizados (com React.memo).
            </Typography>
          </Paper>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdvancedHooks;
