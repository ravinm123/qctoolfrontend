import './App.css';
import Signin from './Componets/Signin';
// import SignUp from './Componets/SignUp';
import Dashboard from './Componets/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './Componets/DashboardLayout';
// import Ssv from './Componets/Ssv';


function App() {
  



  
  return (
    <Router>
      <Routes>
     
        <Route path='/' element={<Signin/>}/>
        <Route path='dashboard' element =  {
                    <DashboardLayout>
                        <Dashboard />
                    </DashboardLayout>
                } />
        </Routes>
      
      
    </Router>
  );
}




export default App;
