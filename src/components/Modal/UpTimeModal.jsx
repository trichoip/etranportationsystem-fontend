import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Load from "../Load";
import useForm from "../../hooks/useForm";
import { validateAddEm } from "../validateInput/validateInput";
import TimeKeeper from "react-timekeeper";
import { putTimeEm } from "../../store/actions/user.action";

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  border-top: 1px solid #343a40;
`;

const UpTimeModal = ({ listUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [timeIn, setTimeIn] = useState(listUser.timein?.slice(0, 5)?listUser.timein.slice(0, 5):"8:00");
  const [timeOut, setTimeOut] = useState(listUser.timeout?.slice(0, 5)?listUser.timeout.slice(0, 5):"18:00");
  const [testOne, setTestOne] = useState(false);
  const dispatch = useDispatch();
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validateAddEm
  );
  function login() {
      dispatch(putTimeEm(values, timeIn, timeOut, listUser))}
  useEffect(
    () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    // eslint-disable-next-line
    []
  );
  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-default form-s">
          <h2 className="title-form">Cập nhật Chấm Công nhân viên</h2>
          <div style={{ display: "flex" }}>
            <div className="col-left" style={{ width: "100%" }}>
              <div className="line-form">
                <label className="label">Giờ Vào</label>
                <span
                  className="wrap-select"
                  style={{
                    textAlign: "center",
                    paddingTop: "8px",
                    backgroundColor: `${testOne ? "#fff" : "#d3ecff"}`,
                  }}
                  onClick={() => setTestOne(!testOne ? testOne : !testOne)}
                >
                  {timeIn ? timeIn : "chưa chấm công vào"}
                </span>
              </div>
            </div>
            <div
              className="col-right"
              style={{ width: "100%", marginLeft: "10px" }}
            >
              <div className="line-form">
                <label className="label">Giờ Ra</label>
                <span
                  className="wrap-select"
                  style={{
                    textAlign: "center",
                    paddingTop: "8px",
                    backgroundColor: `${!testOne ? "#fff" : "#d3ecff"}`,
                  }}
                  onClick={() => setTestOne(testOne ? testOne : !testOne)}
                >
                  {timeOut ? timeOut : "chưa chấm công ra"}
                </span>
              </div>
            </div>
          </div>
          <div className="line-form" style={{ textAlign: "center" }}>
            {!testOne ? (
              <TimeKeeper
                time={timeIn}
                onChange={(newTime) => setTimeIn(newTime.formatted24)}
                hour24Mode
              />
            ) : (
              <TimeKeeper
                time={timeOut}
                onChange={(newTime) => setTimeOut(newTime.formatted24)}
                hour24Mode
              />
            )}
            {/* <span>Time is {time}</span> */}
          </div>
          <div className="line-form">
            <div className="wrap-input has-ico">
              <i className="ic ic-user-fill" />
              <input
                type="text"
                name="reason"
                placeholder="Lý Do"
                onChange={handleChange}
                value={values.reason || ""}
                required
              />
            </div>
          </div>
          <div className="line-form">
            <div className="wrap-input has-ico">
              <i className="ic ic-user-fill" />
              <input
                type="text"
                name="comment"
                placeholder="Ý Kiến Khác"
                onChange={handleChange}
                value={values.comment || ""}
                required
              />
            </div>
          </div>

          <div className="line-form">
            <div className="clear" />
            {isLoading ? (
              <button
                className="btn btn-primary btn--m"
                disabled
                style={{
                  opacity: ".4",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Đăng Kí
                <Load isSmall={true} />
              </button>
            ) : (
              <button className="btn btn-primary btn--m">Cập Nhật</button>
            )}
            <div className="space" />
            <span className="line" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpTimeModal;
