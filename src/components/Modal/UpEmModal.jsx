import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Load from "../Load";
import Validate from "../validateInput";
import useForm from "../../hooks/useForm";
import { validateAddEm } from "../validateInput/validateInput";
import GetDate from "../DateRange";
import moment from "moment";
import { putEm } from "../../store/actions/user.action";

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  border-top: 1px solid #343a40;
`;

const UpEmModal = ({ listUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validateAddEm
  );
  function login() {
    dispatch(putEm(values, user, listUser));
  }
  const [user, setUsers] = useState();
  const handleChanges = (event) => {
    const { value, name } = event.target;
    setUsers({
      ...user,
      [name]: value,
    });
  };
  const handleDateChange = (dates) => {
    setUsers({
      ...user,
      birthDate: moment(dates.startDate).format("YYYY-MM-DD"),
    });
  };
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
          <h2 className="title-form">Cập nhật tài khoản nhân viên</h2>
          <div className="line-form">
            <div className="wrap-input has-ico">
              <i className="ic ic-user-fill" />
              <input
                type="text"
                name="username"
                placeholder="Tên tài khoản"
                onChange={handleChange}
                value={values.username || listUser.username}
                required
              />
              <Validate errors={errors.username} />
            </div>
          </div>
          <div className="line-form">
            <div className="wrap-input has-ico">
              <i className="ic ic-phone-fill" />
              <input
                type="text"
                name="email"
                placeholder="email"
                onChange={handleChange}
                value={values.email || listUser.email}
                required
              />
              <Validate errors={errors.email} />
            </div>
          </div>
          <div className="line-form">
            <div className="wrap-input has-ico">
              <i className="ic ic-phone-fill" />
              <input
                type="text"
                name="phone"
                placeholder="Điện thoại"
                onChange={handleChange}
                value={values.phone || listUser.phone}
                required
              />
              <Validate errors={errors.phone} />
            </div>
          </div>
          <div className="line-form">
            <div className="wrap-input has-ico">
              <i className="ic ic-user-fill" />
              <input
                type="text"
                name="name"
                placeholder="Tên hiển thị"
                onChange={handleChange}
                value={values.name || listUser.name}
                required
              />
              <Validate errors={errors.name} />
            </div>
          </div>
          <div className="line-form">
            <div className="wrap-input has-ico">
              <i className="ic ic-calendar-fill" />
              <input
                name="ip_dob"
                value={user?.birthDate || listUser.birthDate}
              />
            </div>
          </div>
          <GetDate
            onDateChange={handleDateChange}
            focusedRange={[0, 0]}
            maxDate={new Date()}
            // editableDateInputs={true}
            showDateDisplay={false}
          />
          <div className="line-form">
            <div className="wrap-select">
              <select
                name="gender"
                value={user?.gender || listUser.gender}
                onChange={handleChanges}
              >
                <option value={"MALE"}>Nam</option>
                <option value={"FEMALE"}>Nữ</option>
                <option value={"OTHER"}>Khác</option>
              </select>
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
                Cập Nhật
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

export default UpEmModal;
