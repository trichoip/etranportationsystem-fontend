import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcSearch } from "react-icons/fc";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import avatar from "../assets/image/21-avatar-flat (1).gif";
import location from "../assets/image/18-location-pin-flat.gif";
import globe from "../assets/image/27-globe-flat.gif";
import photo from "../assets/image/54-photo-picturelandscape-gallery-flat.gif";
import styles from "../Dashboard/dashboard.module.css";
import Chart from "./../Dashboard/chart/index";
import ProfileUser from "./profileUser";
import Load from "../../../components/Load";
import Pagination from "./pagination";
import axios from "axios";
import TableAdmin from "./table";
import { getUser } from "../../../store/actions/user.action";
function UserManagement() {
  const dispatch = useDispatch();
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [userList, setUserList] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [text, setText] = useState("");
  const [username, setUsername] = useState(null);
  const [handleGrant, setHandleGrant] = useState(null);
  const { users } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.common);
  useEffect(() => {
    const getAccountInfo = async () => {
      setLoadingInfo(true);
      axios({
        method: "GET",
        url: `${
          process.env.REACT_APP_API_URL
        }/admin/account?page=${page}&size=8&username=${text.trim()}`,
      })
        .then((res) => {
          setUserList(res.data.contends);
          setTotalPages(res.data.totalPage);
          setLoadingInfo(false);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getAccountInfo();
    // eslint-disable-next-line
  }, [handleGrant, page, text]);

  useEffect(
    () => {
      username && dispatch(getUser(username));
    },
    // eslint-disable-next-line
    [username]
  );
  const onSearch = (e) => {
    e.preventDefault();
    if (!text || text.length === 0) {
      setPage(1);
    }
  };
  const chartData = {
    labels: ["Users", "Car", "City", "Photos"],
    datasets: [
      {
        label: "number of aircraft",
        data: [35, 65, 105, 130], //fake data
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
      },
    ],
  };
  return (
    <div className={styles.container}>
      <div className={styles.col_dash}>
        <div className={styles.quick}>
          <div className={styles.single_quick}>
            <div className={styles.icon}>
              <img src={avatar} alt="img" />
            </div>
            <div className={styles.count_content}>
              <h3>
                <span>35</span>
              </h3>
              <p>Users</p>
            </div>
          </div>
          <div className={styles.single_quick}>
            <div className={styles.icon}>
              <img src={globe} alt="img" />
            </div>
            <div className={styles.count_content}>
              <h3>
                <span>65</span>
              </h3>
              <p>Car</p>
            </div>
          </div>
          <div className={styles.single_quick}>
            <div className={styles.icon}>
              <img src={location} alt="img" />
            </div>
            <div className={styles.count_content}>
              <h3>
                <span>105</span>
              </h3>
              <p>City</p>
            </div>
          </div>
          <div className={styles.single_quick}>
            <div className={styles.icon}>
              <img src={photo} alt="img" />
            </div>
            <div className={styles.count_content}>
              <h3>
                <span>130</span>
              </h3>
              <p>Photos</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.col_7}>
        <div className={styles.white_box}>
          <div style={{ flex: "1 1 0%" }}>
            <div className={styles.list_header}>
              <div className={styles.main_title}>
                <h3>User Management</h3>
              </div>
              <div className={styles.search_field}>
                <form onSubmit={onSearch}>
                  <div>
                    <input
                      value={text}
                      onChange={(e) => setText(e.target.value) || setPage(1)}
                      type="text"
                      placeholder="Search here..."
                    />
                  </div>
                  <button type="submit">
                    <FcSearch />
                  </button>
                </form>
              </div>
            </div>
            <TableAdmin
              loadingInfo={loadingInfo}
              userList={userList}
              setUsername={setUsername}
              setHandleGrant={setHandleGrant}
            />
          </div>
          <Pagination value={page} range={totalPages} onChange={setPage} />
        </div>
      </div>
      <div className={styles.col_5}>
        {users == null ? (
          <></>
        ) : loading ? (
          <div className={styles.white_box_5}>
            <Load />
          </div>
        ) : (
          <div className={styles.white_box_5}>
            <ProfileUser users={users} />
          </div>
        )}
        <div className={styles.white_box_5}>
          <Chart chartData={chartData} legendPosition="right" />
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
}

export default UserManagement;
