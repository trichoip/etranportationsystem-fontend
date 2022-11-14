// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// // import DeleteTripByAdminModal from "../../../../components/Modal/DeleteTripByAdminModal";
// // import SkeletonTripItem from "../../../../components/SkeletonCard/SkeletonTripItem";
// // import TripItemAdmin from "../../../../components/TripItem/TripItemAdmin";
// import { useIsLogin } from "../../../../hooks/useIsLogin";
// // import { getListTripByAdmin } from "../../../../store/actions/user.action";
// import { OPEN_MODAL } from "../../../../store/constants/modal.const";

// function AllTrip({ hidden, setHidden, setTrip }) {
//   const dispatch = useDispatch();
//   const [totalPages, setTotalPages] = useState(0);
//   const [page, setPage] = useState(1);
//   const [userList, setUserList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   // useEffect(() => {
//   //   dispatch(
//   //     getListTripByAdmin(page, userList, setUserList, setTotalPages, setLoading)
//   //   );
//   //   // eslint-disable-next-line
//   // }, [page]);
//   // const onDeleteTrip = (id) => {
//   //   dispatch({
//   //     type: OPEN_MODAL,
//   //     payload: (
//   //       <DeleteTripByAdminModal
//   //         id={id}
//   //         userList={userList}
//   //         setUserList={setUserList}
//   //       />
//   //     ),
//   //   });
//   // };
//   const { isLogin } = useIsLogin();
//   return userList.length === 0 ? (
//     <div className="w_cw" style={{ width: "100%" }}>
//       <div className="w_cW w_cX ">
//         <label className="w_rI w_rT"></label>
//         <div
//           // className="w_cx"
//           style={{
//             display: "grid",
//             gap: "24px",
//             gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))",
//             margin: "16px 0",
//           }}
//         >
//           {/* <SkeletonTripItem /> */}
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className="w_cw" style={{ width: "100%" }}>
//       <div className="w_cW w_cX ">
//         <label className="w_rI w_rT"></label>
//         <div
//           // className="w_cx"
//           style={{
//             display: "grid",
//             gap: "24px",
//             gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))",
//             margin: "16px 0",
//           }}
//         >
//           {/* {userList.map((listTrip, index) => (
//             <TripItemAdmin
//               listTrip={listTrip}
//               hidden={hidden}
//               setHidden={setHidden}
//               setTrip={setTrip}
//               onDeleteTrip={onDeleteTrip}
//               key={index}
//             />
//           ))} */}
//         </div>
//         {isLogin && (
//           <div
//             className="w_i-"
//             style={{ justifyContent: "center", paddingTop: 30 }}
//           >
//             {loading ? (
//               <button
//                 disabled
//                 className="w_ih w_ik w_cy"
//                 style={{ width: "auto" }}
//               >
//                 <span className="w_ia">Load More</span>
//                 <div className="loadingio-spinner-ripple-ormwzc5m72e">
//                   <div className="ldio-gw2gg1659v">
//                     <div />
//                     <div />
//                   </div>
//                 </div>
//               </button>
//             ) : (
//               <>
//                 {totalPages !== page && (
//                   <button
//                     onClick={() => setPage(page + 1, setLoading(true))}
//                     className="w_ih w_ik w_cy"
//                     style={{ width: "auto" }}
//                   >
//                     <span className="w_ia">Load More</span>
//                   </button>
//                 )}
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AllTrip;
