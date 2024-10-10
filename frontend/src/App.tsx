import { Outlet } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './Context/useAuth';
import CardList from './Components/CardList/CardList';

function App() {
  return (
      <div className="App">
        <CardList />
    </div>

  );
}

export default App;
