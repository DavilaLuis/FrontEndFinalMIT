import { useState, useContext, useEffect } from "react";
import {UserContext, LoginContext}from './context'
import Card from './context'
import { auth } from "./firebase";
import {onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import NavBar from "./navbar";

export default function Login(){
   const [status, setStatus]         = useState('');
   const [email, setEmail]           = useState('');
   const [name, setName]             = useState('');
   const [password, setPassword]     = useState('');
   const [connected, setConnected]   = useState(false);
   //const ctx = useContext(UserContext);
   let loguser = useContext(LoginContext);
   let userExist = 0;

   useEffect(() => {
      //console.log("estoy en login");
      //console.log('loguser es ',loguser);
      if(loguser.name !== ""){
         setConnected(true);
         setName(loguser.name); 
     }
  }, []);
  
  
  function handleLogout(){
      setConnected(false);
      setEmail('');
      setName('');
      setPassword('');
      loguser.name = '';
      loguser.email = '';
      loguser.password = '';
      loguser.balance = '';
      console.log(loguser);
  }

  function callAuthRoute(){
   // call server with token
   console.log('Estoy en el block de autorizacion');

   const user = auth.currentUser;

   if(user){
      console.log('usuario logueado');
   }
   else{
      console.log('usuario no logueado');
   }
  
}


  function handleLogin(){
      console.log(email, password);
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         // Signed in
         const user = userCredential.user;
         console.log('Usuario es:', user);
         // ...
         // este codigo es el original
         const url= `https://goodbank.herokuapp.com/account/login/${email}/${password}`;
         (async () => {
            var res   = await fetch(url);
            console.log('Respouesta del mongo es : ', res);
            var data  = await res.json(); 
            console.log('data es : ', data);
         if(data)
         {
               userExist = 1;
               setConnected(true);
               setEmail(data.email);
               setName(data.name);
               setPassword(data.password);
               loguser.name = data.name;
               loguser.email = data.email;
               loguser.password = data.password;
               loguser.balance = data.balance;
               console.log('Datos de usuario devuelto por Mongo: ', loguser);
            
            //console.log('Data es nombre :', data[0].name);
         }   
         await inicializaFirebase() ;
         })();
      })
      .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
            setEmail('');
            setPassword('');
            alert('Usuario no existe!');
      });
      
      function inicializaFirebase(){
         if(userExist){
            const user = auth.currentUser;
            console.log('Usuario registrado es : ', user);
            if (user !== null) {
            // The user object has basic properties such as display name, email, etc.
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;
            console.log('Correo del usuario: ', email);
            // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            const uid = user.uid;
            }

         }
         
          
      }
        
         
           
          
  }

   function handleLogout(){
      //firebaseapp.auth().signOut();
      signOut(auth).then(() => {
         // Sign-out successful.
         setConnected(false);
         setEmail('');
         setName('');
         setPassword('');
         loguser.name = '';
         loguser.email = '';
         loguser.password = '';
         loguser.balance = '';
         console.log('User logout', loguser);
       }).catch((error) => {
         // An error happened.
       });
       
   }


  return(
   <div className="container">
       {/* <div className="d-flex justify-content-end">
        {connected ? <h6 className="danger">Wellcome : {email}</h6>: <></> }   
        </div> */}
   <center><h1>LOGIN</h1></center>
   <Card 
      bgcolor = "warning"
      header = "Login"
      status = {status}  
      body   = { connected ? (
            <div>
                  <p className="text-dark">Wellcome:    {name}</p>
                  <button type="submit" className="btn btn-light" onClick={handleLogout}>Logout</button>
            </div>
         ) : ( 
            <div>
                  Email<br/>
                  <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                  Password<br/>
                  <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                  <div className="text-center">
                  <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
                  </div>
            </div>
      )}     
      />
      </div>

      
   );
   
}
