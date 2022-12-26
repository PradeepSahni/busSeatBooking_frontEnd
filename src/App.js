// import logo from './logo.svg';
import './App.css';

import {Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
function App() {
  return (
  <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
  </>
  );
}

export default App;
