import { CDSFlex } from "@ciscodesignsystems/cds-react-flex";
import { CDSContainer } from "@ciscodesignsystems/cds-react-container";
import React, { useState} from "react";
import { CDSButton } from "@ciscodesignsystems/cds-react-button";
import { CDSTextInput } from "@ciscodesignsystems/cds-react-text-input";
import { CDSTextArea } from "@ciscodesignsystems/cds-react-textarea";
import {CDSTag} from '@ciscodesignsystems/cds-react-tag';
const getLocal = () => {
  let users = localStorage.getItem("users");
  //console.log(users);
  if (users) {
    return JSON.parse(localStorage.getItem("users"));
  } else {
    return [];
  }
};


function UpdateForm({ i, change, user, setuser, setChange }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [desc, setDesc] = useState(user.desc);
  const [emailError, setEmailError] = useState(null);
  const cancel = () => {
    setChange(false);
  };
  const saveChanges = (id) => {
    if (name === "") {
      alert("User Name is required!");
      return;
    }
    if (emailError !== null) {
      alert("Email is Invalid!");
      return;
    }

    setuser({
      index: id,
      name: name,
      email: email,
      desc: desc,
    });

    let users = getLocal();
    let update = users.filter((elem) => {
      return elem.index !== id;
    });
    console.log(update);
    getLocal();
    let updateduser = {
      index: id,
      name: name,
      email: email,
      desc: desc,
    };
    update.push(updateduser);
    localStorage.removeItem("users");
    getLocal();
    localStorage.setItem("users", JSON.stringify(update));
    getLocal();
    setChange(false);
  };

  const inputEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailError(null);
      return;
    }
    if (!isValidEmail(e.target.value)) {
      setEmailError("Email is invalid!");
    } else {
      setEmailError(null);
    }
  };
  function isValidEmail(email) {
    const emailRegExp =
      /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    return emailRegExp.test(email);
  }
  return (
    <CDSContainer
      style={{
        top: "calc(50%)",
        left: "calc(43%)",
        position: "absolute",
        zIndex: "1",
        width: "30%",
        padding: "8px",
        backgroundColor: "rgb(242,242,242)",
      }}
    >
      <CDSFlex direction="vertical" gap={10}>
        <CDSFlex direction="vertical" gap={5}>
          <CDSTextInput
            id="cds-text-input-with-label-required"
            placeholder="Enter Name..."
            value={name}
            required
            type="text"
            size="md"
            width="md"
            style={{ backgroundColor: "white" ,width:"100%"}}
            onChange={(e) => setName(e.target.value)}
          />
          <CDSFlex direction="vertical">
            <CDSTextInput
              id="text-input"
             
              value={email}
              style={{ backgroundColor: "white",width:"100%" }}
              placeholder="Enter Email..."
              type="email"
              size="md"
              width="md"
              onChange={inputEmail}
            />
             {emailError && (
                  <CDSTag.Status
                    size="md"
                    status="negative"
                    textAlign="center"
                    wrap
                    style={{margin:'10px 4px'}}
                  >
                    {emailError}
                  </CDSTag.Status>
                )}
          </CDSFlex>
          <CDSTextArea
            id="cds-textarea-with-label-optional"
            value={desc}
            size="md"
            optional="optional"
            placeholder="Enter Some Description..."
            style={{ width: "100%" }}
            onChange={(e) => setDesc(e.target.value)}
          />
        </CDSFlex>
        <CDSButton.Group>
          <CDSButton
            variant="primary"
            onClick={() => saveChanges(user.index)}
            style={{ width: "50%" }}
          >
            Done
          </CDSButton>
          <CDSButton
            style={{ width: "50%" }}
            variant="secondary"
            onClick={cancel}
          >
            Cancel
          </CDSButton>
        </CDSButton.Group>
      </CDSFlex>
    </CDSContainer>
  );
}
export default UpdateForm;
