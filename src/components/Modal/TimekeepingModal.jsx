import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getDriver } from "../../store/actions/user.action";
import { CLOSE_MODAL } from "../../store/constants/modal.const";
import { putDriver } from "./../../store/actions/car.action";

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  border-top: 1px solid #343a40;
`;

export const ConfirmButton = styled.div`
  margin: 10px;
  color: #fff;
  height: 40px;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  background-color: #3bc9db;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #1098ad;
  }
`;
export const VerifiedButton = styled.div`
  margin: 10px;
  color: #fff;
  height: 40px;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  background-color: #00a550;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #009648;
  }
`;
export const CloseButton = styled.div`
  margin: 10px;
  color: #fff;
  height: 40px;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  background-color: #e03131;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s;

  &:hover {
    background-color: #c92a2a;
  }
`;

const Message = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 1.15rem;
`;

const TimekeepingModal = ({ id, setHandleGrant }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const onFailed = () => {
    setIsLoading(true);
    dispatch(putDriver(id, "FAILED", setHandleGrant));
    closeModal();
    setIsLoading(false);
  };
  useEffect(
    () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      dispatch(getDriver(id));
    },
    // eslint-disable-next-line
    [id]
  );
  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
  };

  return (
    <div>
      <>
        <Message>
          Bạn có chắc chắn muốn chấm công hay không?
        </Message>
        <ModalFooter>
          <ConfirmButton onClick={onFailed} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Chấm Công"}
          </ConfirmButton>
          <CloseButton onClick={closeModal}> Hủy </CloseButton>
        </ModalFooter>
      </>
    </div>
  );
};

export default TimekeepingModal;
