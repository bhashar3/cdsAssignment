import React from "react";
import "./index.css";

import { CDSContainer } from "@ciscodesignsystems/cds-react-container";
import { CDSFooter } from "@ciscodesignsystems/cds-react-footer";
import { CDSHeading } from "@ciscodesignsystems/cds-react-heading";
import { CDSHeader } from "@ciscodesignsystems/cds-react-header";
import { CDSFlex } from "@ciscodesignsystems/cds-react-flex";
import { CDSDivider } from "@ciscodesignsystems/cds-react-divider";
import {CDSText} from '@ciscodesignsystems/cds-react-text';
import App from "./App";

function Appmain() {
  return (
    <CDSContainer datatest-id="container-main"
      margin={[16, 16, 16, 16]}
      style={{ backgroundColor: "rbga(247,247,247,247)", height: "950px" }}
    >
      <CDSFlex  >
      <CDSDivider  style={{width:'40%',margin:"auto"}}  />
       <CDSText  style={{fontSize:'2.3rem',fontWeight:'100',color:'#1d69cc'}}>User Management</CDSText>
       <CDSDivider style={{width:'40%',margin:"auto"}} />
      </CDSFlex>
      <App />
      <div style={{ position: "fixed", bottom: "20px", width: "95%" }}>
        <CDSFooter brandName="Cisco Systems, Inc." />
      </div>
    </CDSContainer>
  );
}

export default Appmain;
