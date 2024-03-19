import React from "react";
import "./index.css";
import { CDSContainer } from "@ciscodesignsystems/cds-react-container";
import { CDSFlex } from "@ciscodesignsystems/cds-react-flex";
import { CDSHeading } from "@ciscodesignsystems/cds-react-heading";
import { CDSText } from "@ciscodesignsystems/cds-react-text";
function App() {
  return (
    <CDSContainer data-testid="app-container"
      margin={[16, 16, 16, 16]}
      style={{
        width: "95%",
        height: "95%",
        backgroundImage:
          "linear-gradient(to right,rgb(229 225 225) 1px,transparent 1px),linear-gradient(to bottom ,rgb(229 225 225) 1px,transparent 1px)",
        backgroundSize: "4vh 4vh",
      }}
    >
      <CDSFlex
        justify="center"
        align="center"
        style={{ height: "90%",margin:'50px 50px' }}
      >
        <CDSContainer style={{ width: "55%", height: "80%" }}>
          <CDSFlex
            direction="vertical"
            justify="center"
            align="center"
            gap={50}
            style={{ padding: "50px" }}
          >
            <CDSHeading style={{ fontSize: "2rem" }}>
              {" "}
              Welcome to
              <span id="head" data-text="  CODE-IT" data-testid="heading"> CODE-IT</span>
            </CDSHeading>
            <CDSText
              monospace="true"
              width={550}
              align="justify"
              weight="regular"
              style={{ fontSize: "1.5rem" }}
            >
              {" "}
              The Code development platforms are the types of visual software
              development environments that allow enterprise developers and
              citizen developers to drag and drop application components,
              connect them together and create mobile or web apps. These
              platforms are often discussed synonymously with the development
              methods they embody.
            </CDSText>
          </CDSFlex>
        </CDSContainer>
      </CDSFlex>
    </CDSContainer>
  );
}

export default App;
