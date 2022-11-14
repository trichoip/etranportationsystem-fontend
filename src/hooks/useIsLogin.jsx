import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin, getUser } from "../store/actions/user.action";

export function useIsLogin() {
  const dispatch = useDispatch();
  const userLogin = localStorage.getItem("userLogin");
  const id = userLogin ? JSON.parse(userLogin).id : "";
  useEffect(
    () => {
      userLogin && dispatch(getAdmin(id));
    },
    // eslint-disable-next-line
    [id]
  );
  useEffect(
    () => {
      dispatch(getUser(id));
    },
    // eslint-disable-next-line
    []
  );
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.user);
  const { admin } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.common);
  // const role =
  //   admin == null
  //     ? "USER"
  //     : admin.roles.find((role) => {
  //         return `${role}`;
  //       });
  const adminRole = admin == null ? "USER" : admin.roles.length;

  const avatar = users === null || users.avatar === null ? "" : users.avatar;
  return {
    user,
    isLogin: user,
    loading,
    avatar,
    isLoginToAdmin: adminRole,
  };
}
