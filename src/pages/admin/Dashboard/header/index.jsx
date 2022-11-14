// import {  useState } from "react";
import { Link } from "react-router-dom";
import { useIsLogin } from "../../../../hooks/useIsLogin";
import Logo from "../../../../assets/images/logomioto.png";
// import FormLogout from "../../../../components/Header/formLogout";
import styles from "./headerAmin.module.css";
export default function HeaderAdmin({ user }) {
  const { avatar } = useIsLogin();
  return (
    <header>
      <div className={styles.header}>
        <div className={styles.headerLogo}>
          <div>
            <Link to="/">
              <img alt="logo" src={Logo} />
            </Link>
          </div>
        </div>
        <div className={styles.menu}></div>
        <div className={styles.profile}>
          <div className={styles.profileList}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link to={`/profile/${user.username}`}>
                <div className={styles.profileIcon}>
                  <img className="w_km" alt="profile" src={avatar} />
                </div>
                <div>
                  <span>{user.username}</span>
                </div>
              </Link>
              {/* <FormLogout /> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
