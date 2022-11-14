import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import CarSearch from "./CarSearch";
import FilterCar from "./FilterCar";
import NavSearch from "./NavSearch";

function Search() {
  const listInnerRef = useRef();
  const { cityId } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [test, setTest] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [carList, setCarList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [carModel, setCarModel] = useState([]);
  const [brandId, setBrandId] = useState(0);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [features, setFeatures] = useState([]);
  const [seats, setSeatsIn] = useState([]);
  const [priceType, setPriceType] = useState("ALL");
  const [transmission, setTransmission] = useState("");
  const [fuel, setFuel] = useState("");
  const [val, setVal] = useState({ min: 0, max: 3000 });
  const [valYear, SetValYear] = useState(1990);
  useEffect(
    () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      console.log(
        "-----",
        cityId,
        "",
        priceType,
        [val.min, val.max],
        seats.map((s) => parseInt(s.id)),
        fuel,
        [valYear, 2022],
        transmission,
        brandId,
        carModel.map((c) => parseInt(c.id)),
        features.map((f) => f.id)
      );
      const getAccountInfo = async () => {
        setLoadingInfo(true);
        axios({
          method: "POST",
          url: `${process.env.REACT_APP_API_URL}/car/search?page=${page}&size=6`,
          data: {
            city: {
              id: cityId,
            },
            street: "",
            sortPriceType: priceType,
            priceBetween: [val.min, val.max],
            seatsIn: seats.map((s) => parseInt(s.id)),
            fuel,
            yearOfManufactureBetween: [valYear, 2022],
            transmission,
            brand_Id: brandId,
            model_Id_In: carModel.map((c) => c.id),
            feature_Id_in: features.map((f) => f.id),
          },
        })
          .then((res) => {
            console.log("=", test);

            test && setCarList([]);
            console.log("==", carList);
            setCarList([...carList, ...res.data.contends]);
            setBrandList(res.data.carBrands);
            setCarModels(res.data.carModels);
            setTotalPages(res.data.totalPage);
            setLoadingInfo(false);
            setTest(false);
          })
          .catch((err) => {
            console.error(err);
          });
      };
      getAccountInfo();
    },
    // eslint-disable-next-line
    [
      cityId,
      page,
      priceType,
      features,
      val,
      seats,
      valYear,
      transmission,
      fuel,
      brandId,
      carModel,
    ]
  );
  // useEffect(
  //   () => {
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //     setTest(true);
  //     setPage(1);
  //     setCarList([]);
  //   },
  //   // eslint-disable-next-line
  //   [
  //     cityId,
  //     priceType,
  //     features,
  //     val,
  //     seats,
  //     valYear,
  //     transmission,
  //     fuel,
  //     brandId,
  //   ]
  // );
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (
        scrollTop + clientHeight === scrollHeight &&
        page !== totalPages &&
        carList.length > 0
      ) {
        setPage(page + 1);
      }
    }
  };

  return (
    <section
      className="body has-filter no-pd-on-mobile"
      style={{
        paddingTop: "60px",
      }}
    >
      <NavSearch />
      {cityId !== 0 ? (
        <CarSearch
          carList={carList}
          onScroll={onScroll}
          listInnerRef={listInnerRef}
          loadingInfo={loadingInfo}
        />
      ) : (
        <div
          className="module-map"
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "50px",
          }}
        >
          <div className="has-list">
            <button
              className="btn btn--m btn-search-car"
              style={{ opacity: "60%" }}
              disabled
            >
              <i className="ic ic-search" />{" "}
              <span>TÌM XE NGAY (chọn thành phố và quận huyện)</span>
            </button>
          </div>
        </div>
      )}

      <FilterCar
        setPriceType={setPriceType}
        features={features}
        setFeatures={setFeatures}
        val={val}
        setVal={setVal}
        seats={seats}
        setSeatsIn={setSeatsIn}
        setFuel={setFuel}
        setTransmission={setTransmission}
        valYear={valYear}
        SetValYear={SetValYear}
        brandList={brandList}
        setBrandId={setBrandId}
        setPage={setPage}
        setCarList={setCarList}
        carModels={carModels}
        setCarModel={setCarModel}
        carModel={carModel}
      />
    </section>
  );
}

export default Search;
