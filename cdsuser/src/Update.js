import { CDSFlex } from "@ciscodesignsystems/cds-react-flex";
import { CDSContainer } from "@ciscodesignsystems/cds-react-container";
import React, { useContext } from "react";
import { CDSButton } from "@ciscodesignsystems/cds-react-button";
import UserEach from "./UserEach";
import {UserListContext} from './App';
import { X } from 'phosphor-react';
const getLocal = () => {
  let users = localStorage.getItem("users");
  //console.log(users);
  if (users) {
    return JSON.parse(localStorage.getItem("users"));
  } else {
    return [];
  }
};
const getUser=(ind)=>{
  let users=getLocal();
  if(users){
    for(let i=0;i<users.length;i++){
        if(users[i].index===ind){
            console.log(users[i]);
            return users[i];
        }
    }
  }
  else{
    return {};
  }
}

const getList = (users) => {
    if (users) {
  
      let newList = [];
  
      newList = users.map((elem, key) => {
        let newListItem = {
          id: elem.index,
          firstName: elem.name,
          email: elem.email,
          index: elem.index,
          description: elem.desc,
          descProvided: false,
        };
        if (newListItem.email === "") {
          newListItem.email = "-";
        }
        if (newListItem.description !== "") {
          newListItem.descProvided = true;
        }
        return newListItem;
      });
      return newList;
    } else {
      return [];
    }
  };

  
const getEach=(indexes)=>{
    let selectedUsers=[];
    let users=getLocal();
    for(let i=0;i<indexes.length;i++){
        selectedUsers.push(getUser(users[indexes[i]].index));
    }
    console.log(selectedUsers);
    return selectedUsers;
}
function Update({indexes,setSelectedRows,setUpdate}) {
const setList=useContext(UserListContext);

  const users=getLocal();
  const selectedUsers=getEach(indexes);
  
const doneUpdate=()=>{
    setList(getList(getLocal()));
    setUpdate(false);
    setSelectedRows({});
}
  return (
    <CDSContainer
      style={{
        top: "calc(15%)",
        left: "calc(46%)",
        position: "absolute",
        zIndex: "1",
        width: "48%",
        padding: "8px",
        height: "500px",
        
        backgroundColor: "rgb(242,242,242)",
        display:'block',
        boxShadow:'0px 0px 18px -5px grey',
        paddingBottom:'10px'
      }}
      
    >
        <CDSFlex  direction="vertical" gap={30}> 
       <CDSButton onClick={doneUpdate} variant="tertiary" style={{    fontSize: 'x-large',
    color: 'grey',
    width: '5%',
    margin: '0px 0px 0px 79vh'}}><X/></CDSButton>
    <div style={{ maxHeight: "400px",
        overflowY: "scroll",}}>
      <CDSFlex direction="vertical" gap={10} >
        
        
        {
          selectedUsers.map((selectedUser,key)=>{
            return <UserEach ele={selectedUser} ind={selectedUser.index}/>
          })
        }
       </CDSFlex>
       </div>
       
       </CDSFlex>
    </CDSContainer>
  );
}
export default Update;
