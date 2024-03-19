import React, { useState, useEffect } from "react";

import "./index.css";
import { CDSFlex } from "@ciscodesignsystems/cds-react-flex";
import { CDSButton } from "@ciscodesignsystems/cds-react-button";
import { CDSText } from "@ciscodesignsystems/cds-react-text";
import { CDSCard } from "@ciscodesignsystems/cds-react-card";
import UpdateForm from "./UpdateForm";

function UserEach({ ele, ind }) {
  const [change, setChange] = useState(false);
  const [isActive, setActive] = useState(false);
  const [user, setUser] = useState({
    index: ele.index,
    name: ele.name,
    email: ele.email,
    desc: ele.desc,
  });

  const handleShow = () => {
    setActive(!isActive);
  };
  const updateUser = () => {
    setChange(true);
  };
  return (
    <CDSCard status="info" interactive>
      <CDSFlex direction="vertical">
        <CDSFlex justify="space-between">
          <CDSText size="p3" weight="bold" color="regular">
            {user.name} :{" "}
            {user.email === "" ? (
              <span style={{ color: "grey", fontStyle: "italic" }}>
                Email is not provided for this user
              </span>
            ) : (
              user.email
            )}
          </CDSText>
          <CDSButton.Group
          //   style={{
          //     justifyContent: 'flex-end'
          //   }}
          >
            <CDSButton
              variant="tertiary"
              onClick={updateUser}
              style={{ fontSize: "1.5rem" }}
            >
              📝
            </CDSButton>
            {/* <CDSButton
              variant="secondary"
              onClick={() => deleteUser(user.index)}
              rightIcon={<Trash size={16} weight="bold" />}
            ></CDSButton> */}
          </CDSButton.Group>
        </CDSFlex>
        <p className={`card-text`}>
          {isActive &&
            (user.desc === "" ? (
              <p style={{ color: "grey", fontStyle: "italic" }}>
                No Description is provided for this user
              </p>
            ) : (
              user.desc
            ))}
        </p>
        <CDSButton onClick={handleShow} style={{width:'20%'}} size="sm">
          {isActive ? "Show less" : "Show more"}
        </CDSButton>
        {change && (
          <UpdateForm
            i={ind}
            change={change}
            user={user}
            setuser={setUser}
            setChange={setChange}
          />
        )}
      </CDSFlex>
    </CDSCard>
  );
}
export default UserEach;
