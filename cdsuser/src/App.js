import React, { useState, useEffect, createContext } from "react";
import "./index.css";
import { CDSFlex } from "@ciscodesignsystems/cds-react-flex";
import { CDSContainer } from "@ciscodesignsystems/cds-react-container";
import { CDSTextInput } from "@ciscodesignsystems/cds-react-text-input";
import { CDSTextArea } from "@ciscodesignsystems/cds-react-textarea";
import { CDSButton } from "@ciscodesignsystems/cds-react-button";
import { Trash } from "phosphor-react";
import { CDSTable } from "@ciscodesignsystems/cds-react-table";
import { CDSCard } from "@ciscodesignsystems/cds-react-card";
import Update from "./Update";
import { CDSTag } from "@ciscodesignsystems/cds-react-tag";
import { IcNegative, IcPositive } from "@ciscodesignsystems/cds-react-icons";

export const getLocal = () => {
  let users = localStorage.getItem("users");
  if (users) {
    return JSON.parse(localStorage.getItem("users"));
  } else {
    return [];
  }
};

const expandedRowRender = (row) => {
  return (
    <CDSCard style={{ margin: "10px 5px" }} data-testid="description-card">
      <h5
        style={{
          margin: 0,
          fontSize: "18px",
          lineHeight: "24px",
          fontWeight: "300",
          fontStyle: "italic",
          color: "grey",
        }}
      >
        User Description
      </h5>
      <p
        style={{
          padding: 0,
          margin: "10px 0",
          fontFeatureSettings: "tnum",
          fontVariantNumeric: "tabular-nums",
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: "400",
        }}
      >
        {row.getValue("description")}
      </p>
    </CDSCard>
  );
};

const getList = (users) => {
  //let users = localStorage.getItem("users");
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
    console.log(newList);
    return newList;
  } else {
    return [];
  }
};

export const UserListContext = createContext(null);

export let sharedUsers = getLocal();

// export function shareUsers(){
//   return sharedUsers;
// }

function App() {
  const [selectedRows, setSelectedRows] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [users, setUsers] = useState(getLocal());
  const [emailError, setEmailError] = useState(null);
  const [added, setAdded] = useState(false);
  const [list, setList] = useState(getList(getLocal()));
  const [update, setUpdate] = useState(false);
  const [displayForm,setDisplayForm]=useState(false);
  const addUser = () => {
    if (name === "") {
      alert("User Name is required!");
      return;
    }
    if (emailError !== null) {
      alert("Email is Invalid!");
      return;
    }
    let newUser = {
      index: new Date().getTime().toString(),
      name: name,
      email: email,
      desc: desc,
    };
    let updatedUsers = [...users];
    updatedUsers.push(newUser);
    setUsers(updatedUsers);
    setAdded(true);
    setDisplayForm(false);
  };
  const inputName = (e) => {
    setName(e.target.value);
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

  const inputDesc = (e) => {
    setDesc(e.target.value);
  };
  const deleteSelectedUser = (ind) => {
    const updatedUser = users.filter((elem) => {
      return elem.index !== ind;
    });
    setUsers(updatedUser);
  };
  const deleteUser = () => {
    let indexes = Object.keys(selectedRows);
    for (let ind = 0; ind < indexes.length; ind++) {
      console.log(users[ind]);
      deleteSelectedUser(users[indexes[ind]].index);
    }
    setSelectedRows({});
  };

  const updateUserRow = () => {
    console.log("update");
    setUpdate(true);
  };

  const removeAll = () => {
    setUsers([]);
    setList([]);
    setDisplayForm(false);
  };

  function isValidEmail(email) {
    const emailRegExp =
      /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    return emailRegExp.test(email);
  }

  useEffect(() => {
    setName("");
    setEmail("");
    setDesc("");
    return setAdded(false);
  }, [added]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    console.log(users);
    setList(getList(users));
    console.log(list);
  }, [users]);

  return (
    <div margin={[16, 16, 16, 16]}>
      <CDSFlex>
        <UserListContext.Provider value={setList}>
          {update && (
            <Update
              indexes={Object.keys(selectedRows)}
              setSelectedRows={setSelectedRows}
              setUpdate={setUpdate}
            />
          )}
        </UserListContext.Provider>
        <CDSFlex>
          <CDSButton style={{ height: "600px", width: "40%", position: "relative",transform:"rotate(-90deg)" }} onClick={()=>setDisplayForm(true)}>Add New User</CDSButton>
        {displayForm && <CDSContainer
          style={{ height: "600px", width: "40%", position: "relative" }}
        >
          <CDSFlex direction="vertical" gap="md">
            <h1>Add New User</h1>
            <CDSFlex direction="vertical" height={450} gap={20}>
              <CDSTextInput
                id="cds-text-input-with-label-required"
                label="Name"
                placeholder="Enter Name..."
                required
                type="text"
                size="md"
                value={name}
                style={{ width: "65%" }}
                onChange={inputName}
              />
              <CDSFlex direction="vertical">
                <CDSTextInput
                  id="text-input"
                  label="Email"
                  placeholder="Enter Email..."
                  type="email"
                  size="md"
                  value={email}
                  style={{ width: "65%" }}
                  onChange={inputEmail}
                />
                {emailError && (
                  <CDSTag.Status
                    size="md"
                    status="negative"
                    textAlign="center"
                    wrap
                    style={{ margin: "10px 4px" }}
                  >
                    {emailError}
                  </CDSTag.Status>
                )}
              </CDSFlex>
              <CDSTextArea
                id="cds-textarea-with-label-optional"
                label="Descrition"
                optional="optional"
                placeholder="Enter Some Description..."
                size="md"
                value={desc}
                style={{ width: "175%" }}
                onChange={inputDesc}
              />
            </CDSFlex>
            <CDSFlex direction="vertical" gap={7}>
              <CDSButton
                className="primary"
                style={{ width: "65%" }}
                onClick={addUser}
              >
                Add
              </CDSButton>
              <CDSButton
                style={{
                  width: "65%",
                }}
                rightIcon={<Trash size={16} weight="bold" />}
                onClick={removeAll}
                variant="secondary"
              >
                Delete All
              </CDSButton>
            </CDSFlex>
          </CDSFlex>
        </CDSContainer>}
        </CDSFlex>
        <CDSContainer
          height={650}
          style={
            update
              ? {
                  pointerEvents: "none",
                  opacity: "0.4",
                  width: "55%",
                  backgroundColor: "rgb(230 228 228 / 32%)",
                  maxHeight: "625px",

                  paddingBottom: 0,
                  position: "relative",
                }
              : {
                  width: "55%",
                  backgroundColor: "rgb(230 228 228 / 32%)",
                  maxHeight: "625px",

                  paddingBottom: 0,
                  position: "relative",
                }
          }
        >
          {/* <CDSFlex direction="vertical" gap={10}>
            {users.map((elem) => {
              return (
                <UserEach
                  deleteUser={deleteUser}
                  ele={elem}
                  ind={elem.index}
                  key={elem.index}
                />
              );
            })}
          </CDSFlex> */}
          <CDSContainer style={{ overflowY: "scroll", maxHeight: "550px" }}>
            <CDSFlex align="center" justify="end" data-testid="update-for-users">
              <h3
                style={{
                  marginBottom: "6px",
                  marginRight: "10px",
                  marginTop: "6px",
                }}
              >
                Current Users
              </h3>
              <CDSTag>{users.length} Connected</CDSTag>
            </CDSFlex>
            <CDSTable
              columns={[
                {
                  accessorKey: "firstName",
                  header: "User Name",
                  id: "firstName",
                  meta: {
                    align: "left",
                    columnVisibilityFilterLabel: "User Name",
                  },
                },
                {
                  accessorKey: "email",
                  header: "Email",
                  id: "email",
                  meta: {
                    align: "left",
                    columnVisibilityFilterLabel: "Email",
                  },
                },
                {
                  accessorKey: "description",
                  id: "description",
                  meta: {
                    align: "left",
                    isHidden: true,
                  },
                },
                {
                  accessorKey: "descProvided",
                  header: "Description Provided",
                  id: "descProvided",
                  cell: (descProvided) =>
                    descProvided.getValue() ? <IcPositive /> : <IcNegative />,
                  meta: {
                    align: "center",
                    columnVisibilityFilterLabel: "Description Provided",
                  },
                },
                {
                  accessorKey: "index",
                  id: "index",
                  meta: {
                    isHidden: true,
                  },
                },
              ]}
              sticky={true}
              data={list}
              
              size="comfy"
              enableReorderRows
              pagination
              paginationConfig={{
                pageSize: 10,
                showPageSizeChanger: true,
                pageSizeOptions: [10, 20, 30, 50, 100],
              }}
              actionBarConfig={{
                cancelSelectionText: "Cancel",
                itemsSelectedText: "Selected items",
                selectAllText: "Select all",
                children: (
                  <>
                    <CDSButton destructive onClick={deleteUser}>
                      Remove
                    </CDSButton>
                    <CDSButton variant="secondary" onClick={updateUserRow}>
                      Update
                    </CDSButton>
                  </>
                ),
              }}
              rowSelection={selectedRows}
              onRowSelectionChange={setSelectedRows}
              enableSortColumns={true}
              enableColumnsDisplaySettings={false}
              rowExpansionConfig={{
                expandedRowRender,
                getRowCanExpand: (row) => {
                  return row.getValue("descProvided");
                },
              }}
            >
              <CDSTable.FilterBar />
            </CDSTable>
          </CDSContainer>
        </CDSContainer>
      </CDSFlex>
    </div>
  );
}

export default App;
