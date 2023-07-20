import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ImCheckmark } from "react-icons/im";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import styles from "../Dashboard/dashboard.module.css";
// import Pagination from "../userManagement/pagination";
import axios from "axios";
import TableAdmins from "./table";
import { useIsLogin } from "../../../hooks/useIsLogin";
import moment from "moment";
import Load from "../../../components/Load";
import Chart from "../Dashboard/chart";
import ProfileUser from "../userManagement/profileUser";
import Pagination from "../userManagement/pagination";
import TableAdmin from "../userManagement/table";
import { OPEN_MODAL } from "../../../store/constants/modal.const";
import AddEmModal from "../../../components/Modal/AddEmModal";
// import { NotificationManager } from "react-notifications";
function TimekeepingManager() {
   const dispatch = useDispatch();
  const { isLogin } = useIsLogin();
  const [userList, setUserList] = useState([]);
  const [userAdmin, setUserAdmin] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [time, setTime] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const timeSelect = {
    month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    year: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
  };
  const [idAdmin, setIdAdmin] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [userLists, setUserLists] = useState(null);
  const [loadingInfos, setLoadingInfos] = useState(false);
  const [loadingAd, setLoadingAd] = useState(false);
  const [handleGrant, setHandleGrant] = useState(null);
  useEffect(() => {
    const getAccountInfo = async () => {
      setLoadingInfos(true);
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/management/employee?status=All&page=${page-1}&size=8`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLogin.jwtToken.token}`,
        },
      })
        .then((res) => {
          setUserLists(res.data.content);
          setTotalPages(res.data.totalPages);
          setLoadingInfos(false);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getAccountInfo();
    // eslint-disable-next-line
  }, [handleGrant, page]);
  useEffect(
    () => {
      const getUser = () => {
          setLoadingAd(true);
          axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/management/employee/${idAdmin}`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${isLogin.jwtToken.token}`,
            },
          })
            .then((res) => {setUserAdmin(res.data); setLoadingAd(false);})
            .catch((err) => {console.error(err); setLoadingAd(false);});
      };
      getUser();
    },
    // eslint-disable-next-line
    [idAdmin]
  );
  useEffect(() => {
    const getAccountInfo = async () => {
      setLoadingInfo(true);
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/management/timekeeping/${idAdmin}?month=${time.month}&year=${time.year}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLogin.jwtToken.token}`,
        },
      })
        .then((res) => {
          function getDaysInMonth(time) {
            var date = new Date(time.year, time.month - 1, 1);
            var days = [];
            while (date.getMonth() === time.month - 1) {
              days.push(new Date(date));
              date.setDate(date.getDate() + 1);
            }
            return days;
          }
          var daysInMonth = getDaysInMonth(time);
          const testDay = [];
          daysInMonth.forEach(function (day) {
            testDay.push({
              date: moment(day).format("YYYY-MM-DD"),
              timein: null,
              timeout: null,
              status_timein: null,
            });
          });
          var updatedUsers = testDay.map(function (day) {
            var updatedUser = res.data.timeKeepingList.find(function (
              updatedUser
            ) {
              return updatedUser.date === day.date;
            });
            if (updatedUser) {
              return Object.assign({}, day, updatedUser);
            }
            return day;
          });
          setUserList(updatedUsers);
          setLoadingInfo(false);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getAccountInfo();
    // eslint-disable-next-line
  }, [time, idAdmin]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  const tick = () => {
    setDate(new Date());
  };
    const onAddEm = () => {
      dispatch({
        type: OPEN_MODAL,
        payload: (
          <AddEmModal />
        ),
      });
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
      <div className={styles.col_7}>
        <div className={styles.white_box}>
          <div style={{ flex: "1 1 0%" }}>
            <div className={styles.list_header}>
              <div className={styles.main_title}>
                <h3>Manage Management</h3>
              </div>
              <div className="addEm" onClick={() => onAddEm()}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                    ></path>
                  </svg>
                  Create Employee
                </span>
              </div>
            </div>
            <TableAdmin
              loadingInfo={loadingInfos}
              userList={userLists}
              setUsername={setIdAdmin}
              setHandleGrant={setHandleGrant}
              CheckManage={true}
            />
          </div>
          <Pagination value={page} range={totalPages} onChange={setPage} />
        </div>
      </div>
      <div className={styles.col_5}>
        {loadingAd ? (
          <div className={styles.white_box_5}>
            <Load />
          </div>
        ) : (
          <div className={styles.white_box_5}>
            <ProfileUser users={userAdmin} />
          </div>
        )}
        <div className={styles.white_box_5}>
          <Chart chartData={chartData} legendPosition="right" />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.col_dash} style={{ paddingTop: "0px"}}>
          <div className={styles.white_box}>
            <div style={{ flex: "1 1 0%" }}>
              <div className={styles.list_header}>
                <div className={styles.main_title}>
                  <h3>Timekeeping Management</h3>
                </div>
                <div className="wrap-select" style={{ width: "20%" }}>
                  <select
                    name="cityId"
                    onChange={(e) =>
                      setTime((time) => ({
                        ...time,
                        month: e.target.value,
                      }))
                    }
                    value={time.month}
                  >
                    {timeSelect.month.map((month) => (
                      <option key={month} value={month}>
                        Tháng {month}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="wrap-select" style={{ width: "20%" }}>
                  <select
                    name="cityId"
                    onChange={(e) =>
                      setTime((time) => ({
                        ...time,
                        year: e.target.value,
                      }))
                    }
                    value={time.year}
                  >
                    {timeSelect.year.map((year) => (
                      <option key={year} value={year}>
                        Năm {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="btnCheckin">
                  <div class="svg-wrapper-1">
                    <div class="svg-wrapper">
                      <ImCheckmark />
                    </div>
                  </div>
                  <span>{date.toLocaleTimeString()}</span>
                </div>
              </div>
              <TableAdmins
                loadingInfo={loadingInfo}
                userList={userList}
                setUsername={setIdAdmin}
                setHandleGrant={setHandleGrant}
              />
            </div>
          </div>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
}

export default TimekeepingManager;
