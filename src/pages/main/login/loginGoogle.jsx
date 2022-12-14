import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { useDispatch } from "react-redux";
import { postLoginSuccess } from "../../../store/actions/user.action";
import { gapi } from "gapi-script";
import { NotificationManager } from "react-notifications";
import { useHistory } from "react-router-dom";

const clientId =
  "303534488692-v5rbq96al7glj6jprkee3omtdbg3866g.apps.googleusercontent.com";
export default function LoginGoogle() {
  const dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  const onSuccess = async (res) => {
    try {
      let jwtToken = await axios.post(
        `${process.env.REACT_APP_API_URL}/oauth2`,
        JSON.stringify(res),
        config
      );
      if (jwtToken.status === 200) {
        localStorage.setItem("userLogin", JSON.stringify(jwtToken.data));
      }
      dispatch(postLoginSuccess(jwtToken.data));
      history.push("/");
    } catch (err) {
      NotificationManager.error("Account has been blocked!!!");
    }
  };
  const onFailure = (res) => {
    console.log("onFailure", res);
  };
  return (
    <GoogleLogin
      render={(renderProps) => (
        <div className="wr-btn">
          <button
            className="btn btn-google btn--m"
            type="button"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <i className="ic ic-google" /> Google
          </button>
        </div>
      )}
      buttonText="Login"
      clientId={clientId}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
}
