
import {Navigate,Routes,Route} from 'react-router-dom';
import EmployeeMgmt from './components/EmployeeMgmt';
import {EmployeeDetails} from './components/EmployeeDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

function App() {
  return (
    <div>
    
        <Routes>
      
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/' element={<Navigate to ="/signup"/>}></Route>
          <Route path='/employee' element={<EmployeeMgmt/>}></Route>
          <Route path='/employee/:id' element={<EmployeeDetails/>}></Route>
        </Routes>
    </div>
  )}

  export default App;