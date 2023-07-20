import { useDispatch } from "react-redux";
import Load from "../../../../components/Load";
import TimekeepingModal from "../../../../components/Modal/TimekeepingModal";
import { OPEN_MODAL } from "../../../../store/constants/modal.const";
import styles from "../../Dashboard/dashboard.module.css";

function TableAdmin({ loadingInfo, userList, setUsername, setHandleGrant }) {
  const dispatch = useDispatch();
  const onDriverUser = (id, status) => {
    dispatch({
      type: OPEN_MODAL,
      payload: (
        <TimekeepingModal
          id={id}
          status={status}
          setHandleGrant={setHandleGrant}
        />
      ),
    });
  };
  return (
    <table>
      <thead style={{ display: "tableCaption" }}>
        <tr style={{ display: "table", tableLayout: "fixed", width: "100%" }}>
          <th style={{ textAlign: "left", borderRadius: "30px 0 0 30px" }}>
            Date
          </th>
          <th>Check In</th>
          <th>Check Out</th>
          <th>Status</th>
          <th style={{ borderRadius: "0px 30px 30px 0px" }}>Action</th>
        </tr>
      </thead>
      <tbody
        style={{
          display: "block",
          width: "100%",
          height: "47vh",
          overflow: "auto",
        }}
      >
        {loadingInfo ? (
          <div style={{ width: "1130px", textAlign: "center" }}>
            <Load />
          </div>
        ) : userList && userList.length > 0 ? (
          userList.map((listUser, index) => {
            return (
              <tr
                style={{
                  display: "table",
                  tableLayout: "fixed",
                  width: "100%",
                }}
                key={index}
              >
                <td>
                  <p style={{ marginTop: "13px" }}>{listUser?.date}</p>
                </td>
                <td>
                  <p style={{ marginTop: "13px" }}>
                    {listUser.timein ? listUser.timein : "chưa chấm công vào"}
                  </p>
                </td>
                <td>
                  <p style={{ marginTop: "13px" }}>
                    {listUser.timeout ? listUser.timeout : "chưa chấm công ra"}
                  </p>
                </td>
                <td>
                  {listUser?.status_timein === "lATE_IN" ? (
                    <div
                      style={{
                        marginTop: "8px",
                        // display: "flex",
                        // justifyContent: "space-between",
                      }}
                    >
                      <div className="verify btn btn--s prevent-click">
                        Vào Muộn
                      </div>
                      <span>
                        <i className="ic ic-verifying" />
                      </span>
                    </div>
                  ) : (
                    <>
                      {listUser?.status_timein === "IN_TIME" ? (
                        <div
                          style={{
                            marginTop: "8px",
                            // display: "flex",
                            // justifyContent: "space-between",
                          }}
                        >
                          <div className="verify btn btn--s prevent-click">
                            Đã Chấm
                          </div>
                          <span>
                            <i className="ic ic-verify" />
                          </span>
                        </div>
                      ) : (
                        <div
                          style={{
                            marginTop: "8px",
                            // display: "flex",
                            // justifyContent: "space-between",
                          }}
                        >
                          <div className="verify btn btn--s prevent-click">
                            Nghỉ làm
                          </div>
                          <span>
                            <i className="ic ic-error" />
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-primary btn--m"
                    // onClick={() => setUsername(listUser.id)}
                  >
                    UPDATE
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <div>not found</div>
        )}
      </tbody>
    </table>
  );
}

export default TableAdmin;
