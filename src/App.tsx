import { useState } from 'react'
import './App.css'
import HooksNavigation from './components/HooksNavigation'
import './components/HooksDemo.css'
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Paper, 
  Card, 
  CardContent, 
  CardActions,
  ThemeProvider, 
  createTheme, 
  CssBaseline
} from '@mui/material'
import CodeIcon from '@mui/icons-material/Code'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

// Criando um tema personalizado para a aplicação
const theme = createTheme({
  palette: {
    primary: {
      main: '#646cff',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f5f5f7',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      marginBottom: '1rem',
      background: 'linear-gradient(90deg, #646cff, #9333ea)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h4: {
      fontWeight: 600,
    }
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  const [showDemo, setShowDemo] = useState(false)

  // Mostra a página inicial ou a demonstração de hooks
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {showDemo ? (
        <HooksNavigation />
      ) : (
        <Container maxWidth="md">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              py: 8,
              textAlign: 'center',
            }}
          >
            <CodeIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h1" component="h1">
              Treinamento React Hooks
            </Typography>
            
            <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 4, maxWidth: '600px' }}>
              Explore os hooks do React através de exemplos práticos e interativos
            </Typography>
            
            <Card 
              elevation={4} 
              sx={{ 
                width: '100%', 
                maxWidth: 500, 
                mb: 5,
                overflow: 'visible',
                position: 'relative',
                borderRadius: 3,
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: -2,
                  left: -2,
                  right: -2,
                  bottom: -2,
                  background: 'linear-gradient(45deg, #646cff, #9333ea)',
                  borderRadius: '16px',
                  zIndex: -1,
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                  Pronto para começar?
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Este tutorial interativo explora os principais hooks do React e como usá-los efetivamente 
                  em seus projetos.
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button 
                  onClick={() => setShowDemo(true)} 
                  variant="contained" 
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  sx={{ 
                    px: 4, 
                    py: 1.5, 
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 14px rgba(100, 108, 255, 0.4)'
                  }}
                >
                  Iniciar Demonstração
                </Button>
              </CardActions>
            </Card>
            
            <Paper 
              elevation={0} 
              sx={{ 
                bgcolor: 'background.paper', 
                p: 3, 
                borderRadius: 3,
                border: '1px solid rgba(0,0,0,0.1)'
              }}
            >
              <Typography variant="body2" color="text.secondary">
                React Hooks permitem que você utilize recursos do React em componentes funcionais,
                como estado, ciclo de vida, contexto e muito mais, sem escrever classes.
              </Typography>
            </Paper>
          </Box>
        </Container>
      )}
    </ThemeProvider>
  )
}

export default App
