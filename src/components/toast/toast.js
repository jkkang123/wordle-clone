import React, { useEffect } from "react";
import styled from "styled-components";

const ToastMessage = styled.div`
  z-index: 100;
  position: absolute;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  background-color: #000000;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  font-size: 15px;
  padding: 3px;
  transform: translate(-50%, 0);
  top: 50px;
  left: 50%;
`

const Toast = ({ message, isActive, setIsActive }) => {
  useEffect(() => {
    if (isActive === true)
      setTimeout(() => {
        setIsActive(false);
      }, 2000);
  });
  return <>{isActive ? <ToastMessage show={true}>{message}</ToastMessage> : <ToastMessage show={false} />}</>;
};
 
export default Toast;