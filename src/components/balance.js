import { useContext } from "react";
import { UserContext } from "./context";

export default function Balance(){
    const ctx = useContext(UserContext);
    return(
        <center> <h1>Balance <br/>
           {JSON.stringify(ctx)} 
        </h1></center> 
    );
}