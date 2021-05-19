import React, {} from "react";
import styled from "styled-components";

const StyledSVG = styled.svg`
    display: block;
    width: 100%;
    overflow: visible;
`

function LineChart(bondData) {
  const id = "historicalChart";
  return (
  <div  style={{ marginTop: "1rem", height: "400px" }}>
        <StyledSVG >
          <defs>
            <clipPath id={id}>
              <rect x="0" y="0" width="100%" height="100%" />
            </clipPath>
          </defs>
          <g className="y-axis" />
          <g className="x-axis1" />
          <g className="x-axis" />
          <g className="content" clipPath={`url(#${id})`} />        
          </StyledSVG>
      </div>      
    );
}

export default LineChart;
