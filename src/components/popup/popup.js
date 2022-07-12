import React, { useEffect } from "react";
import styled from "styled-components";
import { PopupButtons } from "../../core/constants/strings";

const SharePopup = styled.div`
  z-index: 100;
  position: absolute;
  display: ${(props) => (props.show ? "block" : "none")};
  text-align: center;
  border: 1px solid #d3d6da;
  box-shadow: 2px 3px 4px 0;
  border-radius: 5px;
  padding: 3px;
  height: 80px;
  width: 200px;
  background-color: #ffffff;
  transform: translate(-50%, 0);
  top: 40%;
  left: 50%;
`

const PopupButtonWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
`

const PopupButton = styled.button`
  border: 1px solid #d3d6da;
  padding: 5px;
  margin: 5px;
  height: 50%
`

const Popup = ({ isActive, setIsActive, replayGame, shareResult }) => {
  useEffect(() => {
    
  });
  const onClosePopup = () => {
    setIsActive(false)
  }
  return <>{
    isActive ? 
    <SharePopup show={true}>
      <PopupButtonWrapper>
        <PopupButton onClick={() => {shareResult(); onClosePopup();}}> {PopupButtons.share}</PopupButton>
        <PopupButton onClick={() => {replayGame(); onClosePopup();}}>{PopupButtons.replay}</PopupButton>
        <PopupButton onClick={onClosePopup}>{PopupButtons.close}</PopupButton>
      </PopupButtonWrapper>
    </SharePopup> 
    : <SharePopup show={false} />}
    </>;
};
 
export default Popup;