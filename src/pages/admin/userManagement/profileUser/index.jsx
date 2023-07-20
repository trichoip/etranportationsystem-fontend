import React from "react";
import styles from "./profileUser.module.css";
function ProfileUser({ users }) {
  return (
    <div>
      <img
        className={styles.profile_card}
        src={
          `${users?.thumnail}` === "null" || ` ${users?.thumnail}` === null
            ? "https://wrld-se-prod.b-cdn.net/images/bezfotky.png"
            : `${users?.thumnail}`
        }
        alt=""
      />
      <div className={styles.profile_info}>
        <img
          className={styles.profile_pic}
          src={
            `${users?.avatar}` === "null"
              ? "https://wrld-se-prod.b-cdn.net/images/user-empty.svg"
              : `${users?.avatar}`
          }
          alt=""
        />
        <div className={styles.Container_info}>
          <h2>
            {users?.username}
            <span>/{users?.username}</span>
          </h2>
          <div className={styles.alls}>
            <div className={styles.all}>
              <span>{users?.gender}</span>
            </div>
            <div className={styles.all}>
              <span>{users?.phone}</span>
            </div>
            <div className={styles.all}>
              <span>{users?.email}</span>
            </div>
          </div>
          <p dangerouslySetInnerHTML={{ __html: users?.aboutMe }}></p>
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
