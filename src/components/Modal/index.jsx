import React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
// import { BrowserRouter, Switch } from 'react-router-dom';
import styled from "styled-components";
import { CLOSE_MODAL } from "../../store/constants/modal.const";
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  height: ${(props) => (props.isOpen ? "100vh" : "0px")};
  display: block;
  transition: all 0.3s;
  overflow: hidden;
`;

const Modal = styled.div`
  overflow: auto;
  overflow-y: scroll;
  position: fixed;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  border-radius: 10px;
  background: #f8f9fa;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9;
  transform: translate(-50%, -50%);
`;
export const ModalContent = styled.div``;

const ModalShadow = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.7;
  backdrop-filter: blur(2px);
`;
export function ModalContainer() {
  const { isOpen, content } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  function close() {
    console.log("asd");
    dispatch({
      type: CLOSE_MODAL,
    });
  }

  return ReactDOM.createPortal(
    <Container isOpen={isOpen}>
      <ModalShadow onClick={close} />
      <Modal>
        <ModalContent>
          <div className="modal-content" role="document">
            <div className="modal-header" style={{ padding: "25px 20px 40px" }}>
              <button type="button" className="close" onClick={close}>
                <span aria-hidden="true">×</span>
                <span className="sr-only" />
              </button>
            </div>
            {content}
          </div>
        </ModalContent>
      </Modal>
    </Container>,
    document.getElementById("root_modal")
  );
}
