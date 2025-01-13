import axios from "axios";
import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const {logout} = useContext(AuthContext)

  return (
    <div>
      dashboard menu <button onClick={logout}>logout</button>
      dashboard nav <Link to={"/admin/dashboard"}>summary</Link>
      dashboard nav <Link to={"/admin/dashboard/orders"}>orders</Link>
      dashboard nav <Link to={"/admin/dashboard/jockeys"}>jockeys</Link>
      <Outlet />
    </div>
  );
}
