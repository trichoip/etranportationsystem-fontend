import axios from "axios";
import React, { useState, useEffect } from "react";
import { FcSearch } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { NotificationContainer } from "react-notifications";
import GetDate from "../../../components/DateRange";
import Load from "../../../components/Load";
import { useIsLogin } from "../../../hooks/useIsLogin";
import styles from "../Dashboard/dashboard.module.css";
// import Pagination from "../userManagement/pagination";
import { postDriver } from "../../../store/actions/car.action";
import moment from "moment";

function VoucherManagement() {
  const dispatch = useDispatch();
  const { loading } = useIsLogin();
  // const [totalPages, setTotalPages] = useState(0);
  // const [page, setPage] = useState(1);
  const [val, setVal] = useState(10);
  const [valHai, setValHai] = useState(30);
  const [voucherList, setVoucherList] = useState(null);
  const [voucher, setVoucher] = useState({ code: "", discription: "" });
  const [loadingInfo, setLoadingInfo] = useState(false);
  console.log("🚀~ loadingInfo", loadingInfo);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [text, setText] = useState("");
  const handleDateChange = (dates) => {
    setStartDate(dates.startDate);
    setEndDate(dates.endDate);
  };
  const inputHandler = (e) => {
    setVal(e.target.value);
  };
  const inputHandlerHai = (e) => {
    setValHai(e.target.value);
  };
  useEffect(() => {
    const getAccountInfo = async () => {
      setLoadingInfo(true);
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/voucher?code=${text.trim()}`,
      })
        .then((res) => {
          setVoucherList(res.data);
          // setTotalPages(res.data.totalPage);
          setLoadingInfo(false);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getAccountInfo();
    // eslint-disable-next-line
  }, [text, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      postDriver(
        voucher.code,
        parseInt(val),
        parseInt(valHai),
        voucher.discription,
        moment(startDate).format("YYYY-MM-DD"),
        moment(endDate).format("YYYY-MM-DD")
      )
    );
  };
  const handleChange = (event) => {
    const { value, name } = event.target;
    setVoucher({
      ...voucher,
      [name]: value,
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.col_7}>
        <div className={styles.white_box}>
          <div style={{ flex: "1 1 0%" }}>
            <div className={styles.list_header}>
              <div className={styles.main_title}>
                <h3>Voucher Management</h3>
              </div>
              <div className={styles.search_field}>
                <form>
                  <div>
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Nhập mã khuyến mãi..."
                    />
                  </div>
                  <button type="submit">
                    <FcSearch />
                  </button>
                </form>
              </div>
            </div>
            <div
              className="swiper-wrapper box-car__wrap"
              style={{
                display: "grid",
                gap: "24px",
                gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              }}
            >
              {voucherList !== null && voucherList.length > 0
                ? voucherList.map((voucher, index) => (
                    <div className={styles.white_box} key={index}>
                      <div className="left">
                        <img
                          className="img-promo"
                          src="https://n1-cstg.mioto.vn/g/2018/03/17/16/52.jpg"
                          alt="Mioto - Thuê xe tự lái"
                        />
                      </div>
                      <div className="center">
                        <p className="code">{voucher.code}</p>
                        <p className="desc">
                          Giảm <span>{voucher.percentage}%. </span>(tối đa
                          <span> {voucher.maxDiscount}K</span>)
                        </p>
                      </div>
                    </div>
                  ))
                : "not found"}
            </div>
          </div>
          {/* <Pagination value={page} range={totalPages} onChange={setPage} /> */}
        </div>
      </div>
      <div className={styles.col_5}>
        <div className={styles.white_box_5}>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-default form-s">
              <div className="line-form">
                <div className="wrap-input has-ico">
                  <i className="ic ic-phone-fill" />
                  <input
                    type="text"
                    name="code"
                    placeholder="text"
                    onChange={handleChange}
                    value={voucher.code}
                    required
                  />
                  {/* <Validate errors={errors.username} /> */}
                </div>
              </div>
              <div className="line-form">
                <div className="wrap-input has-ico">
                  <i className="ic ic-lock-fill" />
                  <input
                    type="text"
                    name="discription"
                    placeholder="discription"
                    onChange={handleChange}
                    value={voucher.discription}
                    required
                  />
                  {/* <Validate errors={errors.password} /> */}
                </div>
              </div>
              <div className="col-left">
                <div className="line-form end">
                  <label className="label">
                    Giảm giá thuê tuần (% trên đơn giá)
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    val={val}
                    onInput={inputHandler}
                    style={{
                      padding: 0,
                    }}
                  />
                  <span style={{ float: "right", fontSize: 14 }}>{val}%</span>
                  <div className="space m" />
                  <p className="pl">
                    <span className="note">Giảm đề xuất: 10%</span>
                  </p>
                </div>
              </div>
              <div className="col-right">
                <div className="line-form end">
                  <label className="label">
                    Giảm giá thuê tháng (% trên đơn giá)
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    val={valHai}
                    onInput={inputHandlerHai}
                    style={{
                      padding: 0,
                    }}
                  />
                  <span style={{ float: "right", fontSize: 14 }}>
                    {valHai}%
                  </span>
                  <div className="space m" />
                  <p className="pl">
                    <span className="note">Giảm đề xuất: 30%</span>
                  </p>
                </div>
              </div>
              <GetDate
                onDateChange={handleDateChange}
                minDate={new Date()}
                editableDateInputs={true}
                showDateDisplay={false}
              />
              <div className="line-form notice-form note">
                <p className="d-flex-between">
                  Ngày nhận xe
                  <span>
                    {startDate
                      ? moment(startDate).format("DD/MM/YYYY")
                      : "chưa chọn ngày nhận"}
                  </span>
                </p>
                <p className="d-flex-between">
                  Ngày trả xe
                  <span>
                    {endDate
                      ? moment(endDate).format("DD/MM/YYYY")
                      : "chưa chọn ngày trả"}
                  </span>
                </p>
              </div>
              <div className="line-form">
                <div className="clear" />
                {loading ? (
                  <button
                    className="btn btn-primary btn--m"
                    disabled
                    style={{
                      opacity: ".4",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    ADD VOUCHER
                    <Load isSmall={true} />
                  </button>
                ) : (
                  <button className="btn btn-primary btn--m">
                    ADD VOUCHER
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
}

export default VoucherManagement;
