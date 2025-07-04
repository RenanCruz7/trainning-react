import { useState } from 'react';
import HookBasics from './HookBasics';
import ContextExample from './ContextExample';
import ReducerExample from './ReducerExample';
import AdvancedHooks from './AdvancedHooks';
import CustomHooksExample from './CustomHooksExample';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  Tabs, 
  Tab, 
  Paper, 
  CssBaseline, 
  ThemeProvider, 
  createTheme
} from '@mui/material';
import StateIcon from '@mui/icons-material/DataObject';
import ContextIcon from '@mui/icons-material/Share';
import ReducerIcon from '@mui/icons-material/SettingsEthernet';
import AdvancedIcon from '@mui/icons-material/Code';
import CustomIcon from '@mui/icons-material/Extension';

// Criando um tema customizado
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
      fontSize: '2.5rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1rem',
        },
      },
    },
  },
});

const HooksNavigation = () => {
  const [activeTab, setActiveTab] = useState('basics');
  
  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              React Hooks Lab
            </Typography>
          </Toolbar>
          <Paper square elevation={0}>
            <Tabs 
              value={activeTab}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="primary"
              variant="fullWidth"
              sx={{ 
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                '& .MuiTabs-indicator': {
                  height: 3,
                }
              }}
            >
              <Tab 
                icon={<StateIcon />} 
                iconPosition="start"
                label="useState & useEffect" 
                value="basics"
              />
              <Tab 
                icon={<ContextIcon />} 
                iconPosition="start"
                label="useContext" 
                value="context"
              />
              <Tab 
                icon={<ReducerIcon />} 
                iconPosition="start"
                label="useReducer" 
                value="reducer"
              />
              <Tab 
                icon={<AdvancedIcon />} 
                iconPosition="start"
                label="useRef, useCallback & useMemo" 
                value="advanced"
              />
              <Tab 
                icon={<CustomIcon />} 
                iconPosition="start"
                label="Hooks Personalizados" 
                value="custom"
              />
            </Tabs>
          </Paper>
        </AppBar>
        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box 
            component={Paper}
            sx={{ 
              p: 3, 
              borderRadius: 2,
              boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
            }}
          >
            {renderContent()}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default HooksNavigation;
