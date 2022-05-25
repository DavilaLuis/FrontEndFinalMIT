import { useEffect, useState, useContext } from "react";
import { UserContext,LoginContext } from "./context";
import Card from "./context";

export default function Deposit(){
    const [status, setStatus]         = useState('');
    const [deposit, setDeposit]       = useState(0);
    const [balance, setBalance]       = useState(0);
    const [connected, setConnected]   = useState(false);
    const [validationNumber, setValidationNumber] = useState(false);
    const [validationNeg, setValidationNeg] = useState(false);
    const [validation, setValidation] = useState(false);
    let log = useContext(LoginContext);
    //const ctx = useContext(UserContext);


    useEffect(() => {
        //console.log("estoy Deposit");
        //console.log(log.name);
      if(log.name !== "" && log.name !== 'admin'){
          setConnected(true);
      }
    }, []); 

    // useEffect(() => {
    //     //console.log("estoy balance");
    //     //console.log(log);
    // }, [balance]); 

    function handleDeposit(){
        log.balance = Number(log.balance) + Number(deposit);
        // este codigo es el original
        const url= `https://goodbank.herokuapp.com/account/deposit/${log.email}/${log.balance}`;

        (async () => {
          var res   = await fetch(url);
          console.log('Respouesta del mongo es : ', res);
          var data  = await res.json(); 
          console.log('data es : ', data);
         if( data)
         {
          //const indice = ctx.users.findIndex((element) => element.name=== log.name );
          //ctx.users[indice].balance = log.balance;
          setBalance(log.balance);
          setDeposit(0);
          alert("Your deposit has been made succesfully");
          
          //console.log('Data es nombre :', data[0].name);
         }   
 
       })();
    }

    const handleChange = (e) =>{
        const cantidad = e.currentTarget.value;
        const esTexto = typeof(cantidad);
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
        setDeposit(cantidad);
    }

    return(
        <div className="container">
            <div className="d-flex justify-content-end">
        {connected ? <h6 className="danger">Wellcome : {log.email}</h6>: <></> }   
        </div>
        <center><h1>DEPOSIT</h1></center>
        <Card 
            bgcolor = "success"
            header = "Deposit"
            status = {status}  
            body   = { connected ? ( 
                <div>
                    <div className="d-flex justify-content-between">
                    <div>BALANCE   : </div><div>{log.balance} </div>
                    </div><br/>
                    DEPOSIT AMOUNT<br/><br/>
                    <input type="input" className="form-control" id="deposit" placeholder="Deposit amount" value={deposit} onChange={handleChange}/><br/>
                    {(validationNumber) && <p className="danger">Error, enter numerical values only</p>}
                    {(validationNeg) && <p className="danger">Error, enter positive numbers only</p>}
                    <div className="text-center">
                    <button type="submit" disabled={validation} className="btn btn-light" onClick={handleDeposit}>Deposit</button>  
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