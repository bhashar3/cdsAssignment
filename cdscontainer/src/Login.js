import React, { useState, useEffect,useContext } from "react";
import ValidatePass from "./ValidatePass";
import {Link,useNavigate} from 'react-router-dom'
import { CDSContainer } from "@ciscodesignsystems/cds-react-container";
import { CDSFlex } from "@ciscodesignsystems/cds-react-flex";
import { CDSText } from "@ciscodesignsystems/cds-react-text";
import { CDSTextInput } from "@ciscodesignsystems/cds-react-text-input";
import { CDSButton } from "@ciscodesignsystems/cds-react-button";
import {CDSTag} from '@ciscodesignsystems/cds-react-tag';
import {CDSDivider} from '@ciscodesignsystems/cds-react-divider';
import { CDSNotification} from "@ciscodesignsystems/cds-react-notification";
import "./index.css";

import { MembersContext } from "./App";
import { UserSignedInContext } from "./App";

const check = (email, password, members) => {
  let x = members.filter((elem) => {
    return email === elem.email && password === elem.password;
  });
  if (x.length !== 0) {
    return true;
  } else {
    return false;
  }
};
const Login = ({
  getMembers
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [passError, setPassError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [valid, setValid] = useState(0);

  const{members, setMembers}=useContext(MembersContext);
  const {userSigned,setUserSigned}=useContext(UserSignedInContext);
  
  const navigate=useNavigate();

  function isValidEmail(email) {
    const emailRegExp =
      /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    return emailRegExp.test(email);
  }
  const inputEmail = (e) => {
    setEmail(e.target.value);
    if (email === "") {
      setEmailError(null);
      return;
    }
    if (!isValidEmail(e.target.value)) {
      setEmailError("Email is invalid!");
    } else {
      setEmailError(null);
    }
  };
  const inputPassword = (e) => {
    setPassword(e.target.value);
  };
  //   const saveData = () => {
  //     localStorage.setItem("UserSignedIn", JSON.stringify(userSigned));
  //   };
  const changeSignedInUser = () => {
    let x = getMembers();
    let y = x.filter((elem) => {
      return email === elem.email && password === elem.password;
    });
    setUserSigned(y);
    //localStorage.setItem("users",JSON.stringify(y.relatedUsers));
    localStorage.setItem("UserSignedIn", JSON.stringify(y));
  };
  const handleSubmit = (e) => {
    if ("" === email || "" === password) {
      alert("Input Details are Missing!");
      
    } else if (valid < 4) {
      alert("Complete Password Validation");
      
    } else if (!check(email, password, members)) {
      alert("User Doesn't Exist!");
     
    } else {
      //saveData();
      changeSignedInUser();
      navigate('/home');
    }
  };

  const handleClick=()=>{
    navigate('/');
  }

  return (
    <CDSContainer
      margin={[16, 16, 16, 16]}
      style={{ height: "950px", backgroundColor: "#f7f7f7" }}
    >
      <CDSFlex justify="center" align="center">
      <CDSContainer
          style={{
            // backgroundColor: "whitesmoke",
            padding: "40px",
            width: "30%",
          }}
        >
    <CDSFlex
      direction="vertical"
      gap={30}
      style={{ width: "100%", position: "relative" }}
    >

       
      <CDSFlex
        gap={10}
        style={{ width: "100%", fontSize: "2rem" }}
        justify="center"
      >
        Welcome to{" "}
        <CDSText weight="bold" size="lg" style={{ color: "blue" }}>
          {" "}
          CODE-IT
        </CDSText>
      </CDSFlex>
      <CDSFlex direction="vertical" gap={20} style={{ width: "100%" }}>
        <CDSTextInput
          id="cds-text-input-with-label-required"
          label="Email"
          placeholder="Enter Email..."
          required
          size="lg"
          style={{ width: "100%" }}
          type="email"
          onChange={inputEmail}
        />
          {emailError && (
                  <CDSNotification
                    size="md"
                    status="negative"
                    wrap
                    style={{margin:'10px 4'}}
                  >
                    {emailError}
                  </CDSNotification>
                )}
        <CDSTextInput
          id="cds-text-input-with-label-required"
          label="Password"
          placeholder="Enter Password..."
          required
          size="lg"
          style={{ width: "100%" }}
          type="password"
          onChange={inputPassword}
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        />
      </CDSFlex>
      
      <CDSButton style={{width:'100%'}} size="md" onClick={handleSubmit}>
        Login
      </CDSButton>
      
      <CDSFlex direction="vertical"><CDSDivider/>
      <CDSText style={{ textAlign: "center", margin:'-4px 100px', color: "grey" }}>
        Don't Have an Account?<a href="#" style={{textDecoration:'none',color:'blue'}} onClick={handleClick}>Click Here</a>
      </CDSText>
      </CDSFlex>
      {isVisible && (
        <ValidatePass
          valid={valid}
          setValid={setValid}
          isVisible={isVisible}
          password={password}
          passError={passError}
          setPassError={setPassError}
        />
      )}
      </CDSFlex>
      </CDSContainer>
    </CDSFlex>
    </CDSContainer>
  );
};
export default Login;
