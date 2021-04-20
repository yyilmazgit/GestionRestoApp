import logo from './logo.svg';
import './App.css';
import { Container, Typography } from '@material-ui/core';
import Commande from './components/Commande/index';

function App() {
  return (
    <Container maxWidth="md">
      <Typography variant="h2" align ="center">RestaurantGestion</Typography>
      <Commande/>
    </Container>
  );
}

export default App;
