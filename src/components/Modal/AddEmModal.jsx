import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Load from "../Load";
import Validate from "../validateInput";
import useForm from "../../hooks/useForm";
import { validateAddEms } from "../validateInput/validateInput";
import GetDate from "../DateRange";
import moment from "moment";
import { postEm } from "../../store/actions/user.action";

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  border-top: 1px solid #343a40;
`;

const AddEmModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUsers] = useState();  
  const dispatch = useDispatch();
    const { values, errors, handleChange, handleSubmit } = useForm(
      login,
      validateAddEms
    );
    function login() {
      dispatch(postEm(values, user));
    }
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
          <h2 className="title-form">Đăng kí tài khoản nhân viên</h2>
          <div className="line-form">
            <div className="wrap-input has-ico">
              <i className="ic ic-user-fill" />
              <input
                type="text"
                name="username"
                placeholder="Tên tài khoản"
                onChange={handleChange}
                value={values.username || ""}
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
                value={values.email || ""}
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
                value={values.phone || ""}
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
                value={values.name || ""}
                required
              />
              <Validate errors={errors.name} />
            </div>
          </div>
          <div className="line-form">
            <div className="wrap-input has-ico">
              <i className="ic ic-calendar-fill" />
              <input name="ip_dob" value={user?.birthDate}/>
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
                value={user?.gender}
                onChange={handleChanges}
              >
                <option value={"MALE"}>Nam</option>
                <option value={"FEMALE"}>Nữ</option>
                <option value={"OTHER"}>Khác</option>
              </select>
            </div>
          </div>
          <div className="line-form">
            <div className="wrap-input has-ico">
              <i className="ic ic-lock-fill" />
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                onChange={handleChange}
                value={values.password || ""}
                required
              />
              <Validate errors={errors.password} />
            </div>
          </div>
          <div className="line-form">
            <div className="wrap-input has-ico">
              <i className="ic ic-lock-fill" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Xác nhận mật khẩu"
                onChange={handleChange}
                value={values.confirmPassword || ""}
                required
              />
              <Validate errors={errors.confirmPassword} />
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
              <button className="btn btn-primary btn--m">Đăng Kí</button>
            )}
            <div className="space" />
            <span className="line" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEmModal;
