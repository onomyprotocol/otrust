import React, { useState } from "react";
import styled from "styled-components";

import {
  leftHeaderDefault,
  historicalHeaderDefault,
  candelHeaderDefault,
} from "./defaultChartData";
import LineChart from "./D3LineChart";
import HistoricalChart from "./D3HistoricalChart";
import CandelChart from "./D3CandelChart";
import MenuButtons from '../MenuButtons';

const HeaderWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

export default function D3ChartComplex ({data, areaData}){
  
 const [leftHeader, setLeftHeader] = useState(leftHeaderDefault)

 const [historicalHeader, setHistoricalHeader] = useState(historicalHeaderDefault)

 const [candelHeader, setCandelHeader] = useState(candelHeaderDefault)


//handle Menu Header Buttons (Left Header and right Header)
 const handleLeftHeader = (leftHeader) => {
   setLeftHeader(leftHeader)
 }

 const handleHistoricalHeader = (headerbuttons) => {
   //console.log('historical', headerbuttons)
   setHistoricalHeader(headerbuttons)
 }

 const handleCandelHeader = (headerbuttons) => {
   //console.log('candel', headerbuttons)
   setCandelHeader(headerbuttons)
 }


 //The clicked left header menu button will determine which right header menu buttons will display
 const MenuHeader = () => {
   return (
     <HeaderWrapper>
       <MenuButtons 
         onButtonChange={handleLeftHeader} 
         menuButtons={leftHeader} 
       />

       { leftHeader?.data[1]?.status && 
         <MenuButtons 
           onButtonChange={handleHistoricalHeader} 
           menuButtons={historicalHeader} 
         /> }

       { leftHeader?.data[2]?.status && 
         <MenuButtons 
           onButtonChange={handleCandelHeader} 
           menuButtons={candelHeader} 
         /> }
     </HeaderWrapper>
   )    
 }


 //The clicked left header menu button determine which chart should display. Only one button's status can be true.
 const Chart = () => {
   return (
     <>
     { leftHeader?.data[0]?.status && 
       <LineChart 
         data={data} 
         areaData={areaData} 
       /> }
     { leftHeader?.data[1]?.status && 
       <HistoricalChart 
         historicalHeader={historicalHeader} 
       /> }
     { leftHeader?.data[2]?.status && 
       <CandelChart 
         candelHeader={candelHeader} 
       /> }
     </>
   );
 }

 return (
   <>
    <MenuHeader />
    <Chart />
   </>
 )
}
 