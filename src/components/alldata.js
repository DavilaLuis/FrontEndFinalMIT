import { useState, useEffect, useContext } from "react";
import {LoginContext}from './context'

export default function AllData(){
  //const ctx = React.useContext(UserContext);
  const [datos, setDatos] = useState([]);
  const [connected, setConnected]   = useState(false)
  let loguser = useContext(LoginContext);
      // fetch all accounts from API
  useEffect(() => {
    // Update the document title using the browser API
    if(loguser.email === 'admin@mit.edu'){
        setConnected(true);
    }
    (async() => { 
      
      await fetch('https://goodbank.herokuapp.com/account/all')
            .then(response => response.json())
            .then(data => {
              const info = Object.values(data);
              //console.log('info es:', info);
              setDatos(info);
            });
          }
    )();
  }, []);

  return(
    <div className="container">
    <center><h1>ALL DATA </h1> </center> <br/> 
    { connected ? (
  <div className="container">

      <table className="table table-hover table-bordered"  border="1">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item, index) => {
        return(
          <tr key={index}>
            <td>
              {item.name}
            </td>
            <td>
              {item.email}
            </td>
            <td>
              {item.password}
            </td>
            <td>
              {item.balance}
            </td>
          </tr>
      )})}
   </tbody>
  </table>
  </div>

    ) : (<h1>You need to be admin</h1>)
    
    } 
    </div>
  )
}