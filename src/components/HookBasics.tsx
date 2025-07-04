import { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  ButtonGroup,
  Alert,
  AlertTitle,
  Divider,
  Paper,
  Badge,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import InfoIcon from '@mui/icons-material/Info';
import { green, blue, orange } from '@mui/material/colors';

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
    <Box>
      <Typography variant="h4" component="h2" gutterBottom sx={{ 
        color: green[700],
        borderBottom: `2px solid ${green[400]}`,
        pb: 1,
        mb: 3
      }}>
        useState e useEffect
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
          <Card elevation={3} sx={{ mb: 3, height: '100%' }}>
            <CardHeader 
              title="Exemplo de useState" 
              sx={{ bgcolor: blue[50], borderBottom: `1px solid ${blue[100]}` }}
            />
            <CardContent>
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', 
                p: 2,
                mb: 2
              }}>
                <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold', color: blue[700] }}>
                  {count}
                </Typography>
                
                <ButtonGroup variant="contained" size="large" sx={{ mb: 2 }}>
                  <Button 
                    onClick={() => setCount(count + 1)}
                    startIcon={<AddIcon />}
                    color="primary"
                  >
                    Incrementar
                  </Button>
                  <Button 
                    onClick={() => setCount(count - 1)}
                    startIcon={<RemoveIcon />}
                    color="secondary"
                  >
                    Decrementar
                  </Button>
                </ButtonGroup>
                
                <Button 
                  variant="outlined" 
                  onClick={() => setCount(0)}
                  startIcon={<RestartAltIcon />}
                >
                  Resetar
                </Button>
              </Box>
              
              <Alert severity="info" variant="outlined" sx={{ mt: 2 }}>
                <AlertTitle>Como funciona o useState</AlertTitle>
                O hook useState permite adicionar estado a componentes funcionais. 
                A função retorna um array com dois elementos: o valor atual do estado e 
                uma função para atualizá-lo.
              </Alert>
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
          <Card elevation={3} sx={{ mb: 3, height: '100%' }}>
            <CardHeader 
              title="Exemplo de formulário com useState" 
              sx={{ bgcolor: green[50], borderBottom: `1px solid ${green[100]}` }}
            />
            <CardContent>
              <Box sx={{ p: 2 }}>
                <TextField
                  label="Digite seu nome"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                />
                
                {name && (
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mt: 2, 
                      p: 2, 
                      bgcolor: green[50], 
                      borderRadius: 1,
                      border: `1px solid ${green[200]}`
                    }}
                  >
                    Olá, {name}!
                  </Typography>
                )}
                
                <Alert severity="success" variant="outlined" sx={{ mt: 3 }}>
                  O estado pode ser de qualquer tipo: números, strings, booleanos, arrays, objetos...
                </Alert>
              </Box>
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{ width: '100%' }}>
          <Paper elevation={3} sx={{ p: 3, bgcolor: orange[50], borderLeft: `5px solid ${orange[300]}` }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Badge color="warning" badgeContent="!" sx={{ '& .MuiBadge-badge': { fontSize: 18, height: 22, minWidth: 22 } }}>
                <InfoIcon fontSize="large" sx={{ color: orange[700] }} />
              </Badge>
              <Typography variant="h6">Sobre useEffect:</Typography>
            </Stack>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ pl: 2 }}>
              <Tooltip title="Verifique no título da página" arrow placement="right">
                <Typography paragraph>
                  O título da página muda a cada clique no contador: <strong>"{`Você clicou ${count} vezes`}"</strong>
                </Typography>
              </Tooltip>
              
              <Tooltip title="Abra o console (F12) para ver" arrow placement="right">
                <Typography paragraph>
                  Observe o console para ver os logs dos diferentes useEffect.
                </Typography>
              </Tooltip>
              
              <Typography variant="body2" color="text.secondary">
                useEffect é executado após a renderização do componente. Você pode especificar quando
                ele deve ser executado incluindo um array de dependências como segundo argumento.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default HookBasics;
