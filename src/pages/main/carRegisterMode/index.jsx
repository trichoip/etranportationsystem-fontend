import React from "react";
import { FaCar } from "react-icons/fa";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
import CarRegister from "./carRegister";
import styles from "./CarRegisterMode.module.css";
function CarRegisterMode() {
  return (
    <div
      style={{
        paddingTop: "60px",
      }}
    >
      <nav className={styles.tabs}>
        <ul>
          <li
            className={`${styles["tab-list-item"]} ${styles["tab-list-active"]}`}
          >
            <HiOutlineViewGridAdd />
            <Link
              to="/carRegisterMode"
              className={styles.tabSpan}
              style={{ cursor: "pointer" }}
            >
              Đăng ký xe
            </Link>
          </li>
          <li className={`${styles["tab-list-item"]}`}>
            <FaCar />
            <Link
              to="/myCarRegisterMode"
              className={styles.tabSpan}
              style={{ cursor: "pointer" }}
            >
              Danh sách xe
            </Link>
          </li>
        </ul>
      </nav>
      <section className={styles.dashboard_part}>
        <div className={styles.main_content}>
          <CarRegister />
        </div>
      </section>
    </div>
  );
}

export default CarRegisterMode;
