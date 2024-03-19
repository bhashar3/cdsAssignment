import React, { useState, useEffect, createContext } from "react";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Switch,
  useNavigate,
} from "react-router-dom";
import { CDSContainer } from "@ciscodesignsystems/cds-react-container";
import Signin from "./Signin";
import Cont from "./Cont";
import "./index.css";
import Login from "./Login";
import startPollingForUpdates from './checkupdates.js';

const getMembers = () => {
  let Members = localStorage.getItem("Members");
  if (Members) {
    return JSON.parse(localStorage.getItem("Members"));
  } else {
    return [];
  }
};

export const MembersContext = createContext(null);
export const UserSignedInContext = createContext(null);

function App() {
  // const [remoteVersion,setRemoteVersion]=useState(null);
  // useEffect(()=>{
  //   let intervalId;
  //   const fetchRemoteVersion=async()=>{
  //     try{
  //       const version=await import("cdsuser/userVersion");
  //       if(remoteVersion!==version.version){
  //         console.log(`Remote app Version changed to :${version.version}`);
  //         alert(`Remote app Version changed to :${version.version}`);
  //         setRemoteVersion(version.version);
  //       }
  //     }
  //     catch(error){
  //       console.error("error fetching remote version:",error);
  //     }
  //   }
  //     fetchRemoteVersion();
  // },[]);

  useEffect(() => {
    const remoteUrl = 'http://localhost:3002/remoteEntry.js';
    let lastRemoteContent = null;

    const fetchRemote = () => {
      fetch(remoteUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then(content => {
          if (content !== lastRemoteContent) {
            console.log('The remote app has been updated.');
            alert('The remote app has been updated.');
            
          }
          lastRemoteContent = content;
        })
        .catch(error => {
          console.error('Failed to fetch remote:', error);
        });
    };

    const pollingInterval =  10000;
    const intervalId = setInterval(fetchRemote, pollingInterval);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  // useEffect(() => {
  //   const apiEndpoint = 'http://localhost:8000/api/checksum';
  //   startPollingForUpdates(apiEndpoint);
  // }, []);

  const [userSigned, setUserSigned] = useState({
    name: "",
    email: "",
    password: ""
    
  });
  const [members, setMembers] = useState(getMembers());

  useEffect(() => {
    localStorage.setItem("UserSignedIn", JSON.stringify(userSigned));
    //localStorage.setItem("users",JSON.stringify(userSigned.relatedUsers));
    localStorage.setItem("Members", JSON.stringify(members));
  }, [members]);
  return (
    <BrowserRouter>
      <MembersContext.Provider value={{ members, setMembers }}>
        <UserSignedInContext.Provider value={{ userSigned, setUserSigned }}>
          <Routes>
            <Route
              path="/"
              exact
              element={<Signin getMembers={getMembers} />}
            />
            <Route path="/login" element={<Login  getMembers={getMembers}/>} />
            <Route path="/home" element={<Cont option="home"/>} />
            <Route path="/usermanagement" element={<Cont option="usermanagement"/>} />
            {/* <Route path="/user management" element={<Layout />} /> */}
          </Routes>
        </UserSignedInContext.Provider>
      </MembersContext.Provider>
    </BrowserRouter>
  );
}

export default App;
