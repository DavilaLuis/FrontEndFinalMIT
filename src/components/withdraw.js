import {useState, useContext, useEffect} from 'react'
import { LoginContext, UserContext } from './context';
import Card from './context'


export default function Withdraw(){
  const [status, setStatus]         = useState('');
  const [withdraw, setWithdraw]       = useState(0);
  const [balance, setBalance]       = useState(0);
  const [connected, setConnected]   = useState(false);
  const [validation, setValidation] = useState(false);
  const [validationNumber, setValidationNumber] = useState(false);
  const [validationNeg, setValidationNeg] = useState(false);
  let log = useContext(LoginContext);
  //const ctx = useContext(UserContext);


  useEffect(() => {
      //console.log("estoy Withdraw");
      //console.log('el usuario logueado es : ' + log.name);
    if(log.name !== "" && log.name !== 'admin'){
        setConnected(true);
    }
  }, []); 

  // useEffect(() => {
  //     //console.log("estoy balance");
  //     //console.log(log);
  // }, [balance]); 

  function handleWithdraw(){
      let cantidad = 0;
      cantidad = Number(log.balance) - Number(withdraw);
      //const indice = ctx.users.findIndex((element) => element.name=== log.name );
      if(cantidad >= 0 ){
          log.balance = cantidad;
          // este codigo es el original
          const url= `https://goodbank.herokuapp.com/account/deposit/${log.email}/${log.balance}`;

          (async () => {
            var res   = await fetch(url);
            console.log('Respouesta del mongo es : ', res);
            var data  = await res.json(); 
            console.log('data es : ', data);
          if( data.length !== 0)
          {
            //const indice = ctx.users.findIndex((element) => element.name=== log.name );
            //ctx.users[indice].balance = log.balance;
            setBalance(log.balance);
            alert("Your withdraw has been made succesfully");
            
            //console.log('Data es nombre :', data[0].name);
          }   
  
        })();
      }
      else{
          alert("You don't have enough funds");
      }
      setWithdraw(0);
  }

  const handleChange = (e) =>{
      const cantidad = e.currentTarget.value;
      //const esTexto = typeof(cantidad);
      if(isNaN(cantidad)){
          setValidationNumber(true);
          setValidation(true);
          setValidationNeg(false);
      }
      else if(Number(cantidad) < 0){
          setValidationNeg(true);
          setValidation(true);
          setValidationNumber(false);
      }
      else if(cantidad === ''){
          setValidation(true);
          setValidationNumber(false);
      }
      else{
          setValidation(false);
          setValidationNumber(false);
          setValidationNeg(false);
      }
      setWithdraw(cantidad);
  }

  return(
      <div className="container">
          <div className="d-flex justify-content-end">
        {connected ? <h6 className="danger">Wellcome : {log.email}</h6>: <></> }   
        </div>
          <center><h1>WITHDRAW</h1></center>
      <Card 
          bgcolor = "info"
          header = "Withdraw"
          status = {status}  
          body   = { connected ? ( 
              <div>
                  <div className="d-flex justify-content-between">
                  <div>Balance   : </div><div>{log.balance} </div>
                  </div><br/>
                  Withdraw Amount<br/><br/>
                  <input type="input" className="form-control" id="email" placeholder="Withdraw amount" value={withdraw} onChange={handleChange}/><br/>
                  {(validationNumber) && <p className="danger">Error, enter numerical values only</p>}
                  {(validationNeg) && <p className="danger">Error, enter positive numbers only</p>}
                  <div className="text-center">
                  <button type="submit" disabled={validation} className="btn btn-light" onClick={handleWithdraw}>Withdraw</button>
                  </div>
              </div>
              ): (
                  <div>
                      <p className="text-dark">You have to login</p>
                  </div>
              ) }     
          />
          </div>
  );    
}