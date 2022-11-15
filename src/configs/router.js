import Err from "../pages/main/err";
import Home from "../pages/main/home";
// import ForgotPassword from "../pages/main/forgotPassword";
import Login from "../pages/main/login";
// import Profile from "../pages/main/profile";
// import ResetPassword from "../pages/main/resetPassword";
// import SearchPage from "../pages/main/search";
// import SettingProfile from "../pages/main/settingProfile";
import Dashboard from "../pages/admin/Dashboard";
import Register from "../pages/main/register";
import Profile from "../pages/main/home/profile";
import CarRegisterMode from "../pages/main/carRegisterMode";
import HowItWork from "../components/howItWork";
import CityCode from "../pages/main/home/cityCode";
import CarDetail from "../pages/main/carDetail";
import CarSetting from "../pages/main/carSetting";
import Search from "../components/Search";
import VouCher from "../components/Voucher";
import CarBook from "./../pages/main/carRegisterMode/carBook/index";
import CarLike from "./../pages/main/carRegisterMode/CarLike/index";
import CarDetailBook from "../pages/main/carDetail/carDetailBook";
import MyCarRegisterMode from "../pages/main/carRegisterMode/MyCarRegisterMode";

export const mainRouter = [
  {
    path: "/",
    exact: true,
    Component: Home,
  },
  {
    path: "/profile/:id",
    exact: true,
    Component: Profile,
  },
  {
    path: "/carRegisterMode",
    exact: true,
    Component: CarRegisterMode,
  },
  {
    path: "/myCarRegisterMode",
    exact: true,
    Component: MyCarRegisterMode,
  },
  {
    path: "/howItWork",
    exact: true,
    Component: HowItWork,
  },
  {
    path: "/city/:code",
    exact: true,
    Component: CityCode,
  },
  {
    path: "/car-detail/:carId",
    exact: true,
    Component: CarDetail,
  },
  {
    path: "/book-detail/:bookId",
    exact: true,
    Component: CarDetailBook,
  },
  {
    path: "/carSeting/:carId",
    exact: true,
    Component: CarSetting,
  },
  {
    path: "/search",
    exact: true,
    Component: Search,
  },

  {
    path: "/voucher/",
    exact: true,
    Component: VouCher,
  },
  {
    path: "/car-book",
    exact: true,
    Component: CarBook,
  },
  {
    path: "/car-like",
    exact: true,
    Component: CarLike,
  },
  //   {
  //     path: "/search",
  //     exact: true,
  //     Component: SearchPage,
  //   },
  //   {
  //     path: "/setting",
  //     exact: true,
  //     Component: SettingProfile,
  //   },
  {
    Component: Err,
  },
];
export const signRouter = [
  {
    path: "/login",
    exact: false,
    Component: Login,
  },
  {
    path: "/register",
    exact: false,
    Component: Register,
  },
];
export const adminRouter = [
  {
    path: "/dashboard",
    exact: true,
    Component: Dashboard,
  },
];
