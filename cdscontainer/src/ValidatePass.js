import React,{useState,useEffect}from 'react'
import { CDSContainer } from '@ciscodesignsystems/cds-react-container';
import { CDSFlex } from '@ciscodesignsystems/cds-react-flex';
import {CDSDivider} from '@ciscodesignsystems/cds-react-divider'
import { CDSText } from '@ciscodesignsystems/cds-react-text';
import {CDSTag} from '@ciscodesignsystems/cds-react-tag';
import './index.css'
function ValidatePass({valid,setValid,isVisible,password,passError,setPassError}){
    const [lower,setLower]=useState(false);
    const [upper,setUpper]=useState(false);
    const [len,setLen]=useState(false);
    const [char,setChar]=useState(false);
    const [num,setNum]=useState(false);
   
    
    const lowerRegex=/[a-z]/g;
    const upperRegex=/[A-Z]/g;
    const charRegex=/[@!#$%^&*(){}\.]/g;
    const numRegex=/[0-9]/g;
  
    useEffect(()=>{
      if(lowerRegex.test(password)){
        setLower(true);
        setValid(valid=>valid+1);
      }
      if(password.length>=8){
        setLen(true);
        setValid(valid=>valid+1);
      }
      if(password.length<8){
        setLen(false);
        setValid(valid=>valid-1);
      }
      if(upperRegex.test(password)){
        setUpper(true);
        setValid(valid=>valid+1);
      }
      if(numRegex.test(password)){
        setNum(true);
        setValid(valid=>valid+1);
      }
      if(charRegex.test(password)){
        setChar(true);
        setValid(valid=>valid+1);
      }
      if(!lowerRegex.test(password)){
        setLower(false);
        setValid(valid=>valid-1);
  
      }
      if(!upperRegex.test(password)){
        setUpper(false);
        setValid(valid=>valid-1);
      }
      if(!numRegex.test(password)){
        setNum(false);
        setValid(valid=>valid-1);
      }
      if(!charRegex.test(password)){
        setChar(false);setValid(valid=>valid+1);
      }
    },[password])
    return(<CDSContainer style={{ position: 'absolute',
    top: 'calc(60%)',
    left: 'calc(65%)',
    //backgroundColor: 'rgba(195, 194, 194, 0.96)',
    borderRadius: '7px',
    width: '50%'}}>
       <CDSFlex direction="vertical" gap={10}>
       <CDSTag.Status
          size="md"
          status={upper?"positive":"negative"}
          textAlign="center"
          wrap
        >
          atleast 1 uppercase character
        </CDSTag.Status>
        <CDSTag.Status
          size="md"
          status={lower?"positive":"negative"}
          textAlign="center"
          wrap
        >
          atleast 1 lowercase character
        </CDSTag.Status>
        <CDSTag.Status
          size="md"
          status={num?"positive":"negative"}
          textAlign="center"
          wrap
        >
          atleast 1 number
        </CDSTag.Status>
        <CDSTag.Status
          size="md"
          status={char?"positive":"negative"}
          textAlign="center"
          wrap
        >
          atleast 1 special character
        </CDSTag.Status>  <CDSTag.Status
          size="md"
          status={len?"positive":"negative"}
          textAlign="center"
          wrap
        >
         length should be atleast 8
        </CDSTag.Status>
       </CDSFlex>
    </CDSContainer>)
}
export default ValidatePass;
  