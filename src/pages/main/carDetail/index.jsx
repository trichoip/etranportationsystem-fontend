import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GetDate from "../../../components/DateRange";
import Load from "../../../components/Load";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useDispatch } from "react-redux";
import { useIsLogin } from "../../../hooks/useIsLogin";
import {
  OPEN_BOOK_MODAL,
  OPEN_MODAL,
} from "../../../store/constants/modal.const";
import ModalBookCar from "../../../components/Modal/ModalBookCar";
import { NotificationContainer } from "react-notifications";
import { NotificationManager } from "react-notifications";
import LoginModal from "../../../components/Modal/LoginModal";
function CarDetail() {
  const dispatch = useDispatch();
  const { carId } = useParams();
  const { isLogin, loading, isLoginToAdmin } = useIsLogin();
  const [load, setLoad] = useState(false);
  const [carDetail, setCarDetail] = useState(null);
  const [carReview, setCarReview] = useState(null);
  const [carReviewContent, setCarReviewContent] = useState([]);
  const [checkLike, setCheckLike] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loadings, setLoadings] = useState(false);
  const [check, setCheck] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const onLogin = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: <LoginModal />,
    });
  };
  const numDate =
    moment(endDate, "DD/MM/YYYY").diff(
      moment(startDate, "DD/MM/YYYY"),
      "days"
    ) + 1;
  const disabledDate =
    carDetail &&
    carDetail.books
      .map((book) =>
        book.dates.map((data) => {
          return new Date(data);
        })
      )
      .flat();
  useEffect(() => {
    const getAccountInfo = async () => {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/car/details/${carId}`,
      })
        .then((res) => {
          setCarDetail(res.data);
          setStartDate(null);
          setEndDate(null);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getAccountInfo();
    // eslint-disable-next-line
  }, [carId, load]);
  useEffect(() => {
    const getReview = async () => {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/car/review/${carId}?page=${page}&size=3`,
      })
        .then((res) => {
          setCarReview(res.data);
          setCarReviewContent([...carReviewContent, ...res.data.contends]);
          setLoadings(false);
          setTotalPages(res.data.totalPage);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getReview();
    // eslint-disable-next-line
  }, [page, carId, loading]);

  useEffect(() => {
    const getCheckLike = async () => {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/like/check`,
        data: {
          account: {
            id: isLogin.id,
          },
          car: {
            id: carId,
          },
        },
      })
        .then((res) => {
          setCheckLike(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    isLogin && getCheckLike();
    // eslint-disable-next-line
  }, [carId, check]);

  const handleDateChange = (dates) => {
    setStartDate(dates.startDate);
    setEndDate(dates.endDate);
  };
  const onLikes = () => {
    setCheck(true);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/like`,
      data: {
        account: {
          id: isLogin.id,
        },
        car: {
          id: carId,
        },
      },
    })
      .then((res) => {
        NotificationManager.success(res.data);
        setCheck(false);
      })
      .catch((err) => {
        console.error(err);
        NotificationManager.error(err.response.data.message);
        setCheck(false);
      });
  };
  const onDeleteLike = () => {
    setCheck(true);
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}/like`,
      data: {
        account: {
          id: isLogin.id,
        },
        car: {
          id: carId,
        },
      },
    })
      .then((res) => {
        NotificationManager.success(res.data);
        setCheck(false);
      })
      .catch((err) => {
        console.error(err);
        NotificationManager.error(err.response.data.message);
        setCheck(false);
      });
  };

  const onBookCar = () => {
    dispatch({
      type: OPEN_BOOK_MODAL,
      payload: (
        <ModalBookCar
          carDetail={carDetail}
          startDate={startDate}
          endDate={endDate}
          numDate={numDate}
          load={load}
          setLoad={setLoad}
        />
      ),
    });
  };
  return (
    <section className="body">
      {carDetail ? (
        <div className="cover-car">
          <div className="swiper-container swiper-car swiper-container-horizontal">
            <div className="swiper-wrapper" style={{ display: "flex" }}>
              {carDetail.carImages.map((carImages, index) => (
                <Link
                  to="#"
                  data-swiper-slide-index={1}
                  style={{ width: 500 }}
                  key={index}
                >
                  <div className="img-cover fit-img">
                    <img src={carImages.image} alt="" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="module-detail dt__wrapper">
            <div className="detail-container">
              <div className="content-detail">
                <div className="info-car">
                  <div className="group-name">
                    <h1 className="title-car">{carDetail.name}</h1>
                    <p className="price">
                      <span className="special">1200K</span>
                      <span> /ng??y</span>
                    </p>
                  </div>
                  <div className="group-line">
                    <span className="star">
                      <span className="star_rate-num">
                        {carDetail.totalRating > 0
                          ? carDetail.totalRating
                          : "ch??a c?? ????nh gi?? "}
                      </span>
                      <div
                        className="star-ratings"
                        title="1 Star"
                        style={{
                          position: "relative",
                          boxSizing: "border-box",
                          display: "inline-block",
                        }}
                      >
                        <svg
                          className="star-grad"
                          style={{
                            position: "absolute",
                            zIndex: 0,
                            width: 0,
                            height: 0,
                            visibility: "hidden",
                          }}
                        >
                          <defs>
                            <linearGradient
                              id="starGrad796972137481742"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop
                                offset="0%"
                                className="stop-color-first"
                                style={{
                                  stopColor: "rgb(0, 165, 80)",
                                  stopOpacity: 1,
                                }}
                              />
                              <stop
                                offset="0%"
                                className="stop-color-first"
                                style={{
                                  stopColor: "rgb(0, 165, 80)",
                                  stopOpacity: 1,
                                }}
                              />
                              <stop
                                offset="0%"
                                className="stop-color-final"
                                style={{
                                  stopColor: "rgb(203, 211, 227)",
                                  stopOpacity: 1,
                                }}
                              />
                              <stop
                                offset="100%"
                                className="stop-color-final"
                                style={{
                                  stopColor: "rgb(203, 211, 227)",
                                  stopOpacity: 1,
                                }}
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div
                          className="star-container"
                          style={{
                            position: "relative",
                            display: "inline-block",
                            verticalAlign: "middle",
                          }}
                        >
                          <svg
                            viewBox="0 0 51 48"
                            className="widget-svg"
                            style={{
                              width: 17,
                              height: 17,
                              transition: "transform 0.2s ease-in-out 0s",
                            }}
                          >
                            <path
                              className="star"
                              d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                              style={{
                                fill: "rgb(0, 165, 80)",
                                transition: "fill 0.2s ease-in-out 0s",
                              }}
                            />
                          </svg>
                        </div>
                      </div>
                    </span>

                    <div className="bar-line"> </div>
                    <p>
                      <span className="value">
                        {" "}
                        {carDetail.totalBook} chuy???n
                      </span>
                    </p>
                  </div>
                  <div className="group-label">
                    <span>{carDetail.transmission}</span>
                    <span>Giao xe t???n n??i</span>
                  </div>
                </div>
              </div>
              <div className="sidebar-detail">
                <div className="rent-box rent-car" id="booking-sidebar">
                  <div className="price">
                    <h3>
                      {carDetail.price}K <span> / ng??y</span>
                    </h3>
                  </div>
                  <div className="line-form has-timer">
                    <GetDate
                      onDateChange={handleDateChange}
                      minDate={new Date()}
                      editableDateInputs={true}
                      showDateDisplay={false}
                      disabledDates={disabledDate}
                    />
                  </div>
                  <div className="line-form notice-form note">
                    <p className="d-flex-between">
                      Ng??y nh???n xe
                      <span>
                        {startDate
                          ? moment(startDate).format("DD/MM/YYYY")
                          : "ch??a ch???n ng??y nh???n"}
                      </span>
                    </p>
                    <p className="d-flex-between">
                      Ng??y tr??? xe
                      <span>
                        {endDate
                          ? moment(endDate).format("DD/MM/YYYY")
                          : "ch??a ch???n ng??y tr???"}
                      </span>
                    </p>
                  </div>
                  <div className="line-form local">
                    <div className="note">
                      <Link to="#" className="location-picker">
                        <svg
                          className="icsvg"
                          viewBox="0 0 24 24"
                          style={{ fill: "none" }}
                        >
                          <path
                            d="m12 22.5c5.799 0 10.5-4.701 10.5-10.5 0-5.799-4.701-10.5-10.5-10.5-5.799 0-10.5 4.701-10.5 10.5 0 5.799 4.701 10.5 10.5 10.5zm0 1.5c6.6274 0 12-5.3726 12-12 0-6.6274-5.3726-12-12-12-6.6274 0-12 5.3726-12 12 0 6.6274 5.3726 12 12 12z"
                            clipRule="evenodd"
                            fill="#141414"
                            fillRule="evenodd"
                          />
                          <path
                            d="m7.5 10.494c0-2.4778 2.0187-4.4937 4.5-4.4937 2.4813 0 4.5 2.0159 4.5 4.4937 0 1.2789-0.7204 2.918-2.1412 4.8719-1.0399 1.4301-2.0635 2.484-2.1066 2.5281-0.0662 0.068-0.1572 0.1063-0.2522 0.1063s-0.186-0.0383-0.2522-0.1063c-0.0431-0.0442-1.0667-1.098-2.1066-2.5281-1.4208-1.9539-2.1412-3.593-2.1412-4.8719zm4.5095 1.5064c0.9955 0 1.8025-0.8059 1.8025-1.8 0-0.99411-0.807-1.8-1.8025-1.8s-1.8025 0.80589-1.8025 1.8c0 0.9941 0.807 1.8 1.8025 1.8z"
                            clipRule="evenodd"
                            fill="#141414"
                            fillRule="evenodd"
                          />
                        </svg>
                        <span>{carDetail.addressInfo}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="car-bill">
                    <h4 className="text-center">Chi ti???t gi??</h4>
                    <div className="bill-wrap">
                      <div className="group">
                        <p>????n gi?? thu?? </p>
                        <div className="tooltip">
                          <i className="ic ic-question-mark" />
                          <div className="tooltip-text">
                            Gi?? thu?? xe kh??ng bao g???m ti???n x??ng. Khi k???t th??c
                            chuy???n ??i, b???n s??? ????? x??ng v??? l???i m???c ban ?????u nh?? khi
                            nh???n xe.
                          </div>
                        </div>
                        <p />
                        <span>
                          <span> {carDetail.price} / ng??y</span>
                        </span>
                      </div>
                      <div className="group has-line">
                        <p>
                          <strong>T???ng c???ng</strong>
                        </p>
                        <span>
                          <strong>
                            <span>
                              {isNaN(numDate)
                                ? carDetail.price
                                : carDetail.price * numDate}
                              ??
                            </span>
                          </strong>
                        </span>
                      </div>
                    </div>
                    {isLogin ? (
                      <div className="wrap-btn">
                        {loading ? (
                          <button
                            className="btn btn-primary btn--m"
                            style={{
                              width: "100%",
                              opacity: ".4",
                              display: "flex",
                              justifyContent: "center",
                            }}
                            disabled
                          >
                            <span>????t Xe</span>
                            <Load isSmall={true} />
                          </button>
                        ) : (
                          <>
                            {numDate > 0 ? (
                              <>
                                {isLoginToAdmin === 2 ? (
                                  <button
                                    className="btn btn-primary btn--m"
                                    style={{
                                      width: "100%",
                                      opacity: ".4",
                                    }}
                                    disabled
                                  >
                                    <span>Qu???n l?? Kh??ng ???????c ????t Xe</span>
                                  </button>
                                ) : (
                                  <>
                                    {isLogin.id === carDetail.account.id ? (
                                      <button
                                        className="btn btn-primary btn--m"
                                        style={{
                                          width: "100%",
                                          opacity: ".4",
                                        }}
                                        disabled
                                      >
                                        <span>Xe C???a B???n</span>
                                      </button>
                                    ) : (
                                      <>
                                        {carDetail.status !== "ACTIVE" ? (
                                          <button
                                            className="btn btn-primary btn--m"
                                            style={{
                                              width: "100%",
                                              opacity: ".4",
                                            }}
                                            disabled
                                          >
                                            <span>Xe ??ang ch??? duy???t</span>
                                          </button>
                                        ) : (
                                          <button
                                            className="btn btn-primary btn--m"
                                            style={{
                                              width: "100%",
                                            }}
                                            onClick={onBookCar}
                                          >
                                            <span>????t Xe</span>
                                          </button>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            ) : (
                              <button
                                className="btn btn-primary btn--m"
                                style={{
                                  width: "100%",
                                  opacity: ".4",
                                }}
                                disabled
                              >
                                <span>????t Xe</span>
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="wrap-btn">
                        {numDate > 0 ? (
                          <button
                            className="btn btn-primary btn--m"
                            style={{
                              width: "100%",
                            }}
                            onClick={onLogin}
                          >
                            <span>????t Xe</span>
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary btn--m"
                            style={{
                              width: "100%",
                              opacity: ".4",
                            }}
                            disabled
                          >
                            <span>????t Xe</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="content-detail">
                <div className="info-car--desc">
                  <div className="group">
                    <span className="lstitle-new">?????C ??I???M</span>
                    <div className="ctn-desc-new">
                      <ul className="features">
                        <li>
                          <i className="ic ic-chair" /> S??? gh???:{" "}
                          {carDetail.seats}
                        </li>
                        <li>
                          <i className="ic ic-trans" /> Truy???n ?????ng:{" "}
                          {carDetail.transmission}
                        </li>
                        <li>
                          <i className="ic ic-diesel" /> Nhi??n li???u:{" "}
                          {carDetail.fuel}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="group">
                    <span className="lstitle-new">M?? T???</span>
                    <div className="ctn-desc-new">
                      <pre>{carDetail.description}</pre>
                    </div>
                  </div>
                  <div className="group">
                    <span className="lstitle-new">T??NH N??NG</span>
                    <div className="ctn-desc-new">
                      {carDetail.features.length > 0 ? (
                        <>
                          <ul className="accessories">
                            {carDetail.features.map((feature, index) => (
                              <li key={index}>
                                <img
                                  className="img-ico car-img-sw"
                                  src={feature.icon}
                                  alt="Thu?? xe"
                                />
                                {feature.name}
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        "kh??ng c?? t??nh n??ng"
                      )}
                    </div>
                  </div>
                  <div className="group">
                    <span className="lstitle-new">CH??? XE</span>
                    <div className="profile-mini">
                      <div className="avatar avatar-new" title="title name">
                        <Link to={`/profile/${carDetail.account.id}`}>
                          <div
                            className="avatar-img"
                            style={{
                              backgroundImage: `url(${carDetail.account.avatar})`,
                            }}
                          />
                        </Link>
                        <span className="host-stars tooltip">
                          <svg
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.74373 14.1812L0 20.4535L4.36948 20.2293L6.35463 23.999L9.81785 18.1959C7.33642 17.5754 5.20562 16.1312 3.74373 14.1812Z"
                              fill="#FFA800"
                            />
                            <path
                              d="M20.2329 14.1812C18.7834 16.1302 16.655 17.575 14.1816 18.2039L17.6518 23.999L19.6348 20.2413L23.9995 20.4648L20.2329 14.1812Z"
                              fill="#FFA800"
                            />
                            <circle
                              cx="12.0004"
                              cy="8.72698"
                              r="8.72698"
                              fill="#FFA800"
                            />
                            <circle
                              cx="12.0028"
                              cy="8.7269"
                              r="7.09067"
                              fill="#FFE99D"
                            />
                            <path
                              d="M11.7334 4.59761C11.85 4.28582 12.291 4.28582 12.4076 4.59761L13.2976 6.9777C13.3482 7.11297 13.4747 7.2049 13.619 7.2112L16.1576 7.32213C16.4901 7.33666 16.6264 7.7561 16.3659 7.96333L14.3773 9.54523C14.2643 9.63513 14.216 9.78388 14.2546 9.92305L14.9336 12.3717C15.0225 12.6925 14.6657 12.9517 14.3881 12.768L12.2691 11.3656C12.1487 11.2859 11.9923 11.2859 11.8719 11.3656L9.7529 12.768C9.47531 12.9517 9.11852 12.6925 9.20746 12.3717L9.88644 9.92305C9.92503 9.78388 9.8767 9.63513 9.76368 9.54523L7.7751 7.96333C7.5146 7.7561 7.65088 7.33666 7.98344 7.32213L10.5221 7.2112C10.6663 7.2049 10.7929 7.11297 10.8434 6.9777L11.7334 4.59761Z"
                              fill="#FFA800"
                            />
                          </svg>
                          <div className="tooltip-text">
                            <strong>Ch??? xe 5* </strong> c?? th???i gian ph???n h???i
                            nhanh ch??ng, t??? l??? ?????ng ?? cao v?? d???ch v??? nh???n ???????c
                            nhi???u ????nh gi?? t???t t??? kh??ch h??ng.
                          </div>
                        </span>
                      </div>
                      <div className="desc align-center-desc">
                        <Link to={`/profile/${carDetail.account.id}`}>
                          <h2>{carDetail.account.name}</h2>
                        </Link>
                      </div>
                      <p className="note">
                        L??u ??: S??? ??i???n tho???i c???a ch??? xe s??? ???????c hi???n th??? sau khi
                        ?????t c???c.
                      </p>
                    </div>
                  </div>
                  <div className="wr-wrap-btn">
                    {/* <div className="wrap-btn">
                      <Link to="#" className="btn btn-default btn--m">
                        B??o x???u (updated soon)
                      </Link>
                    </div> */}
                    <div className="wrap-btn">
                      {isLogin || checkLike ? (
                        <>
                          {checkLike.status === "LIKED" ? (
                            <button
                              className="btn btn-primary btn--m"
                              onClick={onDeleteLike}
                              disabled={check}
                            >
                              {check
                                ? "Deleting..."
                                : "X??a kh???i danh s??ch y??u th??ch"}
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary btn--m"
                              onClick={onLikes}
                              disabled={check}
                            >
                              {check
                                ? "Deleting..."
                                : "Th??m v??o danh s??ch y??u th??ch"}
                            </button>
                          )}
                        </>
                      ) : (
                        <button
                          className="btn btn-primary btn--m"
                          onClick={onLogin}
                        >
                          Th??m v??o danh s??ch y??u th??ch
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="info-car--desc">
                  <div className="review">
                    <h4 className="title">????NH GI??</h4>
                    <div className="group-review">
                      <span className="star">
                        <span className="star_rate-num">
                          {carReview.totalStarAverage > 0
                            ? carReview.totalStarAverage
                            : "ch??a c?? ????nh gi?? "}
                        </span>
                        <div
                          className="star-ratings"
                          title="1 Star"
                          style={{
                            position: "relative",
                            boxSizing: "border-box",
                            display: "inline-block",
                          }}
                        >
                          <div
                            className="star-container"
                            style={{
                              position: "relative",
                              display: "inline-block",
                              verticalAlign: "middle",
                            }}
                          >
                            <svg
                              viewBox="0 0 51 48"
                              className="widget-svg"
                              style={{
                                width: 17,
                                height: 17,
                                transition: "transform 0.2s ease-in-out 0s",
                              }}
                            >
                              <path
                                className="star"
                                d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                                style={{
                                  fill: "rgb(0, 165, 80)",
                                  transition: "fill 0.2s ease-in-out 0s",
                                }}
                              />
                            </svg>
                          </div>
                        </div>
                      </span>
                      <div className="bar-line" />
                      <p>
                        <span className="value">
                          {carReview && carReview.totalItem} ????nh gi??
                        </span>
                      </p>
                    </div>
                    {/* <hr className="line" /> */}
                    <div className="space m"></div>

                    <div className="space m"></div>
                    <hr className="line" />
                    {carReviewContent.length > 0 ? (
                      <>
                        {carReviewContent.map((carReview, index) => (
                          <div className="list-comments" key={index}>
                            <div className="left">
                              <div className="fix-avatar">
                                <Link
                                  to={`/profile/${carReview.book.account.id}`}
                                >
                                  <img
                                    src={carReview.book.account.avatar}
                                    alt="Mioto - Thu?? xe t??? l??i"
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="right">
                              <Link
                                to={`/profile/${carReview.book.account.id}`}
                              >
                                <h4 className="name">
                                  {carReview.book.account.name}
                                </h4>
                              </Link>
                              <div className="cmt-box">
                                <div className="group">
                                  <div
                                    className="star-ratings"
                                    title="5 Stars"
                                    style={{
                                      position: "relative",
                                      boxSizing: "border-box",
                                      display: "inline-block",
                                    }}
                                  >
                                    {[...Array(carReview.starReview)].map(
                                      (x, i) => (
                                        <div
                                          className="star-container"
                                          key={i}
                                          style={{
                                            position: "relative",
                                            display: "inline-block",
                                            verticalAlign: "middle",
                                            paddingRight: 1,
                                          }}
                                        >
                                          <svg
                                            viewBox="0 0 51 48"
                                            className="widget-svg"
                                            style={{
                                              width: 17,
                                              height: 17,
                                              transition:
                                                "transform 0.2s ease-in-out 0s",
                                            }}
                                          >
                                            <path
                                              className="star"
                                              d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                                              style={{
                                                fill: "rgb(0, 165, 80)",
                                                transition:
                                                  "fill 0.2s ease-in-out 0s",
                                              }}
                                            />
                                          </svg>
                                        </div>
                                      )
                                    )}
                                  </div>
                                  <p className="date">
                                    {carReview.historyTime}
                                  </p>
                                </div>
                                <p className="desc">{carReview.content}</p>
                                <div className="textAlign-right">
                                  <span className="service-type">T??? l??i</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      "ch??a c?? ????nh gi??"
                    )}
                    <div className="s-all">
                      {loadings ? (
                        <Load isSmall={true} />
                      ) : (
                        <>
                          {totalPages !== page && (
                            <Link
                              to="#"
                              className="see-all"
                              onClick={() =>
                                setPage(page + 1, setLoadings(true))
                              }
                            >
                              Xem th??m
                              <i className="ic ic-chevron-up" />
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Load />
        </div>
      )}
      <NotificationContainer />
    </section>
  );
}

export default CarDetail;
