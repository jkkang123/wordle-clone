import React from 'react'
import styled from 'styled-components'

const KyeButton = styled.button`
  font-weight: bold;
  border: 0;
  padding: 0;
  margin: 0 6px 0 0;
  height: 58px;
  border-radius: 4px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: ${props => props.theme[props.color]};
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
`

function Kye(props) {
  const {label, onClick, color} = props
  return (
    <KyeButton color={color} onClick={(e) => onClick(e.target.innerText)}>{label}</KyeButton>
  )
}

export default Kye