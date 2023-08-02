import React from "react";
import {
  FaUserCog,
  FaCarSide,
  FaFileInvoiceDollar,
  FaCalendarDay,
} from "react-icons/fa";
import Tabs from "./tab/tabs";
import CarManagement from "../carManagement";
import UserManagement from "../userManagement";
import VoucherManagement from "../voucher/";
import Timekeeping from "../timekeeping";
import { useIsLogin } from "../../../hooks/useIsLogin";
import TimekeepingManager from "../timekeepingManage";

function Dashboard() {
  const { manageRole } = useIsLogin();
  return manageRole ? (
    <Tabs>
      <div label="Timekeeping" Icon={FaCalendarDay}>
        <TimekeepingManager />
      </div>
      <div label="User" Icon={FaFileInvoiceDollar}>
       
      </div>
    </Tabs>
  ) : (
    <Tabs>
      <div label="User Management" Icon={FaUserCog}>
        <UserManagement />
      </div>
      <div label="Car Management" Icon={FaCarSide}>
        <CarManagement />
      </div>
      <div label="Voucher" Icon={FaFileInvoiceDollar}>
        <VoucherManagement />
      </div>
      <div label="Timekeeping" Icon={FaCalendarDay}>
        <Timekeeping />
      </div>
    </Tabs>
  );
}

export default Dashboard;
