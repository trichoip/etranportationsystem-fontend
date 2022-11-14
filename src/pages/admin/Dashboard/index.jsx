import React from "react";
import { FaUserCog, FaCarSide, FaFileInvoiceDollar } from "react-icons/fa";
import Tabs from "./tab/tabs";
import CarManagement from "../carManagement";
import UserManagement from "../userManagement";
import VoucherManagement from "../voucher/";

function Dashboard() {
  return (
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
    </Tabs>
  );
}

export default Dashboard;
