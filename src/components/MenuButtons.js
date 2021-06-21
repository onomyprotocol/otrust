/*
* A buttons group that controls switching panels 

  on your parent component, your buttons should look like below:
  <MenuButtons onButtonChange={handerFunction} menuButtons={buttonsArray} />

   @onButtonChange: function, it has two arguments
      arg1: object array, passing updated menu buttons information to the parent component
      arg2: the clicked button id. 
   @menuButtons: object array, 
      information for the  buttons that control switching the panels

   when a button is clicked, its status will change to true

  on your handerFunction, you can get the data for the clickedId and the updated buttons, you can reset the data to update the correlated panel rendering.

  For details, see an example on Chats/D3Chart.js file
**/

import React from "react";
import styled from 'styled-components';

import {borderRadius} from 'context/responsive/cssSizes'

const adjustedRadius = `${parseFloat(borderRadius.slice(0,-3))/2}rem`;

const MenuWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 0.25rem;
`

const MenuHeader = styled.header`
  font-size: 0.7rem;
  color: ${props => props.isClicked ? props.theme.colors.textPrimary : props.theme.colors.textSecondary};
  background: ${props => props.isClicked? props.theme.colors.bgHighlight : props.theme.colors.bgDarken};
  text-align: center;
  vertical-align: middle;
  border-radius: ${adjustedRadius};
  padding: 0.7rem 0.9rem
`

export default function MenuButtons({onButtonChange, menuButtons}) {

  const handleChartClicked = (e) => {
    e.preventDefault()
    const clickedId = e.target.id;
    menuButtons.forEach((button, i) =>  {
        i === parseInt(clickedId) - 1 ? button.status = true : button.status = false})
    onButtonChange(menuButtons, clickedId)
  }

  return (
    <MenuWrapper onClick={handleChartClicked}>
      {
      menuButtons.map((button,i) =>
        <MenuHeader key={button.text} id={i + 1} isClicked={button.status}>
        {button.text}
       </MenuHeader>
      )}
    </MenuWrapper>
  );
}
