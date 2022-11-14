// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { FcUndo } from "react-icons/fc";
// // import { getListImagesByTrip } from "../../../../store/actions/user.action";
// import styles from "../../Dashboard/dashboard.module.css";
// import Load from "./../../../../components/Load/index";
// function ImagesForTrip({ hidden, setHidden, trip }) {
//   const dispatch = useDispatch();
//   const [listImages, setListImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   // useEffect(() => {
//   //   dispatch(getListImagesByTrip(trip, setListImages, setLoading));
//   //   // eslint-disable-next-line
//   // }, [trip]);
//   return listImages.length === 0 ? (
//     <div className="w_cw" style={{ width: "100%" }}>
//       <div className="w_cW w_cX ">
//         <button
//           style={{ justifyContent: "flex-start" }}
//           onClick={() => setHidden(!hidden)}
//         >
//           <div style={{ display: "contents" }}>
//             <FcUndo />
//             <div style={{ paddingLeft: 10 }}>
//               <span>Back</span>
//             </div>
//           </div>
//         </button>
//         <h1>no photos for this trip</h1>
//       </div>
//     </div>
//   ) : (
//     <>
//       {loading ? (
//         <div className="w_cw" style={{ width: "100%" }}>
//           <div className="w_cW w_cX ">
//             <button
//               style={{ justifyContent: "flex-start" }}
//               onClick={() => setHidden(!hidden)}
//             >
//               <div style={{ display: "contents" }}>
//                 <FcUndo />
//                 <div style={{ paddingLeft: 10 }}>
//                   <span>Back</span>
//                 </div>
//               </div>
//             </button>
//             <Load />
//           </div>
//         </div>
//       ) : (
//         <div className="w_cw" style={{ width: "100%" }}>
//           <div className="w_cW w_cX ">
//             <button
//               style={{ justifyContent: "flex-start" }}
//               onClick={() => setHidden(!hidden)}
//             >
//               <div style={{ display: "contents" }}>
//                 <FcUndo />
//                 <div style={{ paddingLeft: 10 }}>
//                   <span>Back</span>
//                 </div>
//               </div>
//             </button>
//             <div
//               // className="w_cx"
//               style={{
//                 display: "grid",
//                 gap: "24px",
//                 gridTemplateColumns: "repeat(3, 1fr)",
//                 margin: "16px 0",
//               }}
//             >
//               {listImages.map((listImages, index) => (
//                 <div className={styles.outer} key={index}>
//                   <div className={styles["item-image"]}>
//                     <img
//                       alt="thumbnailUrl"
//                       src={
//                         listImages.url == null
//                           ? "https://wrld-se-prod.b-cdn.net/images/bezfotky.png"
//                           : listImages.url
//                       }
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default ImagesForTrip;
