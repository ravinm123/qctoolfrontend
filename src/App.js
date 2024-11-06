import './App.css';
import Signin from './Componets/Signin';
// import SignUp from './Componets/SignUp';
import Dashboard from './Componets/Dashboard/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sampleqc from './Componets/Sampleqc';

// import Ssv from './Componets/Ssv';


function App() {
  



  
  return (
    <Router>
      <Routes>
     
        <Route path='/' element={<Signin/>}/>
        <Route path='/dashboard/' element={<Dashboard/>}/>
        <Route path='/sampleqc/' element={<Sampleqc/>}/>
       
        </Routes>
      
      
    </Router>
  );
}




export default App;
