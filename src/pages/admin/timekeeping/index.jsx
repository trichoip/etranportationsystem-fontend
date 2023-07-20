import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ImCheckmark } from "react-icons/im";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import styles from "../Dashboard/dashboard.module.css";
// import Pagination from "../userManagement/pagination";
import axios from "axios";
import TableAdmin from "./table";
import { getUser } from "../../../store/actions/user.action";
import { useIsLogin } from "../../../hooks/useIsLogin";
import moment from "moment";
import { NotificationManager } from "react-notifications";
function Timekeeping() {
  const dispatch = useDispatch();
  const { isLogin } = useIsLogin();
  const [timeNow, setTimeNow] = useState([]);
  const [check, setCheck] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [schedu, setSchedu] = useState(0);
  const [userList, setUserList] = useState([]);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [time, setTime] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const timeSelect = {
    month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    year: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
  };
  const [username, setUsername] = useState(null);
  const [handleGrant, setHandleGrant] = useState(null);
  useEffect(() => {
    const getAccountInfo = async () => {
      setLoadingInfo(true);
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/employee/timekeeping?month=${time.month}&year=${time.year}`,
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
    const getNow = async () => {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/employee/timekeeping?month=${
          new Date().getMonth() + 1
        }&year=${new Date().getFullYear()}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLogin.jwtToken.token}`,
        },
      })
        .then((res) => {
          setTimeNow(
            res.data.timeKeepingList.find(
              (time) => time.date === moment(new Date()).format("YYYY-MM-DD")
            )
          );
        })
        .catch((err) => {
          console.error(err);
        });
    };
    const getSchedules = async () => {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/employee/schedules`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLogin.jwtToken.token}`,
        },
      })
        .then((res) => {
          setSchedule(res.data);
          setSchedu(res.data[0].id);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getAccountInfo();
    getSchedules();
    getNow();
    // eslint-disable-next-line
  }, [time, check]);

  useEffect(
    () => {
      username && dispatch(getUser(username));
    },
    // eslint-disable-next-line
    [username]
  );
  const postTime = () => {
        axios({
          method: "POST",
          url: `${process.env.REACT_APP_API_URL}/timekeeping?type=${
            timeNow === undefined ? "checkin" : "checkout"
          }&schedulesId=${schedu}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLogin.jwtToken.token}`,
          },
        })
          .then((res) => {
            NotificationManager.success("successful");
            setCheck(1);
          })
          .catch((err) => {
            NotificationManager.error("fail");
          });
  };
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
  return (
    <div className={styles.container}>
      <div className={styles.col_dash}>
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
              <div className="wrap-select" style={{ width: "10%" }}>
                <select
                  name="cityId"
                  onChange={(e) => setSchedu(e.target.value)}
                  value={schedu}
                >
                  {schedule.map((schedule) => (
                    <option key={schedule.id} value={schedule.id}>
                      {schedule.name}
                    </option>
                  ))}
                </select>
              </div>
              {timeNow?.timeout === undefined ? (
                <div className="btnCheckin" onClick={() => postTime()}>
                  <div class="svg-wrapper-1">
                    <div class="svg-wrapper">
                      <ImCheckmark />
                    </div>
                  </div>
                  <span>
                    {timeNow === undefined ? "Check In" : "Check Out"}
                    {date.toLocaleTimeString()}
                  </span>
                </div>
              ) : timeNow?.timeout === null ? (
                <div className="btnCheckin" onClick={() => postTime()}>
                  <div class="svg-wrapper-1">
                    <div class="svg-wrapper">
                      <ImCheckmark />
                    </div>
                  </div>
                  <span>
                    {timeNow === undefined ? "Check In" : "Check Out"}
                    {date.toLocaleTimeString()}
                  </span>
                </div>
              ) : (
                <div className="btnCheckin">
                  <div class="svg-wrapper-1">
                    <div class="svg-wrapper">
                      <ImCheckmark />
                    </div>
                  </div>
                  <span>Done {date.toLocaleTimeString()}</span>
                </div>
              )}
            </div>
            <TableAdmin
              loadingInfo={loadingInfo}
              userList={userList}
              setUsername={setUsername}
              setHandleGrant={setHandleGrant}
            />
          </div>
          {/* <Pagination value={page} range={totalPages} onChange={setPage} /> */}
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
}

export default Timekeeping;
