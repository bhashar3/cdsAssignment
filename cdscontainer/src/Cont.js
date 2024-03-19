import Context from './Context';
//import {shareUsers} from 'cdshome/CDShome'
// import {sharedUsers} from 'cdshome/CDShome'
import {useNavigate,Link } from "react-router-dom";
import { CDSNav } from "@ciscodesignsystems/cds-react-nav";
import { CDSFooter } from "@ciscodesignsystems/cds-react-footer";
import { CDSContainer } from "@ciscodesignsystems/cds-react-container";
import { CDSFlex } from "@ciscodesignsystems/cds-react-flex";
import { CDSHeading } from "@ciscodesignsystems/cds-react-heading";
import { CDSButton } from "@ciscodesignsystems/cds-react-button";
import { CDSTag } from "@ciscodesignsystems/cds-react-tag";
import React, { useRef, useEffect, useState,useContext} from "react";
import "./index.css";
import { CDSHeader } from "@ciscodesignsystems/cds-react-header";
import { LockLaminated, User } from "phosphor-react";
import { CDSTenantMenuRow } from "@ciscodesignsystems/cds-react-header";
import { CDSTenantMenuRoot } from "@ciscodesignsystems/cds-react-header";

import { MembersContext } from "./App";
import { UserSignedInContext } from "./App";
import { CDSDivider } from '@ciscodesignsystems/cds-react-divider';

function Cont({option}) {
  const navigate = useNavigate();
  
  const{members, setMembers}=useContext(MembersContext);
  const {userSigned,setUserSigned}=useContext(UserSignedInContext);

// const [users,setUsers]=useState(sharedUsers);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");

  const deleteData = () => {
    let x = JSON.parse(localStorage.getItem("UserSignedIn"));
    let y = JSON.parse(localStorage.getItem("Members"));
    console.log(y);
    console.group(x);
    let z = y.filter((elem) => {
      return elem.email!==x.email && elem.password!==x.password;
    });
    setMembers(z);
    localStorage.removeItem("Members");
    console.log(z);
    localStorage.setItem("Members", JSON.stringify(z));
    setUserSigned({});
  };
  const handleSubmit = () => {
    deleteData();
    navigate("/");
  };
  
  useEffect(()=>{
    setName(userSigned.name);
    setEmail(userSigned.email);
  },[userSigned])

  // useEffect(()=>{
  //   setUsers(sharedUsers);
  //   console.log(users);
  //   console.log(sharedUsers);
  // },[sharedUsers])


  return (
    <CDSContainer
      margin={[16, 16, 16, 16]}
      style={{ height: "950px", backgroundColor: "#f7f7f7" }}
    >
      <CDSHeader
        title="CODE-IT"
        menu={null}
        style={{ position: "relative", top: "-21px" }}
      >
        <CDSTenantMenuRoot
          sentiment="inverse"
          userName={name}
          tenantName=""
        >
          <CDSTenantMenuRow
            leftGutter={<User color="#707070" size={23} weight="regular" />}
            rightGutter={
             
                <CDSButton onClick={handleSubmit} variant="secondary">
                  Logout
                </CDSButton>
             
            }
          >
            <p
              style={{
                fontSize: "12px",
                margin: "0",
                textTransform: "uppercase",
              }}
            >
              Logged in as
            </p>
            <p
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                margin: "0",
              }}
            >
              {name}
            </p>
            <p
              style={{
                fontSize: "14px",
                margin: "0",
              }}
            >
              {email}
            </p>
          </CDSTenantMenuRow>
        </CDSTenantMenuRoot>
      </CDSHeader>
      <CDSFlex direction="vertical" style={{ height: "100%" }}>
      <CDSDivider/>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "min-content 1fr",
            height: "calc(100vh-2rem)",
            margin: "10px",
            height: "70%",
          }}
        >
         
          <CDSNav
            collapseButtonProps={{
              tooltip: undefined,
            }}
          >
            <CDSNav.Section>
              
                <CDSNav.Item
                  icon="home"
                  
                  onClick={() => navigate('/home')}
                  style={{ textDecoration: "none", color: "grey" }}
                >
                  Home
                </CDSNav.Item>
              
                <CDSNav.Item
                  href="#"
                  icon="groups"
                  suffix={
                    <CDSTag.Colored size="sm">
                      {/* {users} */}
                    </CDSTag.Colored>
                  }
                  target="_self"
                  onClick={() => navigate('/usermanagement')}
                  
                  id="User Management"
                  style={{ textDecoration: "none", color: "grey" }}
                >
                  User Management
                </CDSNav.Item>
              
            </CDSNav.Section>
          </CDSNav>
          <div
            style={{
              padding: "24px 10px",
              height: "100%",
            }}
          >
            <Context option={option}/>
          </div>
        </div>
        <div style={{ position: "fixed", bottom: "20px", width: "95%" }}>
          <CDSFooter brandName="Cisco Systems, Inc." className="" />
        </div>
      </CDSFlex>
    </CDSContainer>
  );
}

export default Cont;
