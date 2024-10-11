import { Outlet } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './Context/useAuth';
import CardList from './Components/CardList/CardList';
import Search from './Search/Search';
import { ChangeEvent, SyntheticEvent, useState } from 'react';

function App() {
  const [search, setSearch] = useState<string>("");

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };

  const onClick = (e: SyntheticEvent) => {
    console.log(e);
  };
  return (
      <div className="App">
        <Search onClick={onClick} search={search} handleChange={handleChange}/>
        <CardList />
    </div>

  );
}

export default App;
