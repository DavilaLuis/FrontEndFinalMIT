import {useState} from "react";
import Card from "./context";
import { auth } from "./firebase";
import {onAuthStateChanged, createUserWithEmailAndPassword} from 'firebase/auth'

export default function CreateAccount(){
  const [show, setShow]       = useState(true);
  const [status, setStatus]   = useState('');
  
  return(
    <Card 
    bgcolor = "primary"
    header = "Create Account"
    status = {status}
    body = { show ?
      <CreateForm setShow={setShow}/> :
      <CreateMsg  setShow={setShow}/>}
    />
  )
}

function CreateMsg(props){
    return(
      <div>
        <h5>Success</h5>
        <button type="submit"
            className="btn btn-light"
            onClick={()=> props.setShow(true)}>Add another account</button>
      </div>
    );
}


function CreateForm(props){
    const [name, setName]         = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');

    function handle(){
        console.log(name, email, password);
        let userExist = 0;

        if(userExist === 0)
        {
          createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            // ...
            const url= `https://goodbank.herokuapp.com/account/create/${name}/${email}/${password}`;
            (async () => {
                var res   = await fetch(url);
                var data  = await res.json();
                console.log(data);
            })();
            props.setShow(false);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          }); 
        }
      
    }


    return(
      <form>
          Name<br/>
          <input type="input"
            className="form-control"
            placeholder= "Enter name"
            value = {name}
            onChange={e => setName(e.currentTarget.value)}/><br/>

          Email address<br/>
          <input type="input"
            className="form-control"
            placeholder= "Enter email"
            value = {email}
            onChange={e => setEmail(e.currentTarget.value)}/><br/> 


          Password<br/>
          <input type="password"
            className="form-control"
            placeholder= "Enter password"
            value = {password}
            onChange={e => setPassword(e.currentTarget.value)}/><br/> 

          <button type="submit"
              className="btn btn-light"
              onClick={handle}>Create Account</button>
          
      </form>
    )

}