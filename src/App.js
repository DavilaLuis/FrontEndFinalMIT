import './App.css';
import React from 'react'
import {
  Routes,
  Route,
  HashRouter
} from "react-router-dom";
import NavBar from './components/navbar';
import {UserContext, LoginContext} from './components/context';
import Home from './components/home';
import CreateAccount from './components/createaccount';
import AllData from './components/alldata';
import Deposit from './components/deposit';
import Withdraw from './components/withdraw';
import Login from './components/login';
import Balance from './components/balance';

function App() {
  return (
    <HashRouter>
    <div>
    
        <NavBar />
          <UserContext.Provider value={{users:[{name:'', email:'', password:'', balance: 0}]}}>
          <LoginContext.Provider value ={{name: '', email:'', password:'', balance: 0}}>
          <div className="container" style={{padding: "20px"}}>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/CreateAccount/" element={<CreateAccount/>} />
                <Route path="/alldata/" element={<AllData/>} />
                <Route path="/deposit/" element={<Deposit/>} />
                <Route path="withdraw" element={<Withdraw/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="balance" element={<Balance/>}/>
            </Routes>
          </div>  
          </LoginContext.Provider> 
          </UserContext.Provider>
    
    </div>
  </HashRouter>
  );
}

export default App;
