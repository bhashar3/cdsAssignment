import React,{useContext} from 'react'
import CDShome from "cdshome/CDShome";
import CDSUser from "cdsuser/CDSUser";


const Context=(({option})=>{
    if(option==="home"){
        return <CDShome/>;
    }
    if(option==="usermanagement"){
        return <CDSUser/>;
    }
})
export default Context;
