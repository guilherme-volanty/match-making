import React from "react";
import { css } from "@emotion/core";
import './styles.css'
import CircleLoader from "react-spinners/CircleLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  top: -10px;
`;

function LoadingComponent() { 
    return (
      <div className="sweet-loading">
        <CircleLoader
          css={override}
          size={150}
          color={"#FF5100"}
          loading={true}
        />
      </div>
    );
};

export default LoadingComponent;