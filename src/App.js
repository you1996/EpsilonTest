import './App.css';
import Box from '@mui/material/Box';

import ProminentAppBar from './components/header/header';
import Footer from './components/footer/footer';
import Calendar from './components/calendrie/calendrie';
function App() {
  return (
    <div className="App">
      <ProminentAppBar />
      <Box  sx={{           
          position: 'absolute',
          top: 250,
          left:0,
          zIndex: 'modal',
          flexGrow: 1, backgroundColor:"white", borderRadius:"0 150px 0 0", pb:10, pt:5 }}>
        <Calendar/>
      </Box>
    </div>
  );
}

export default App;
