import { HomeFilled, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const adminLinks = [
  {
    key: "1",
    icon: <HomeFilled />,
    label: <Link to={"/"}>Trang chủ</Link>,
  },
  {
    key: "2",
    icon: <UserOutlined />,
    label: <Link to={"/users"}>Quản lý tài khoản</Link>,
  },
];

export const userLinks = [
  {
    key: "1",
    icon: <HomeFilled />,
    label: <Link to={"/"}>Trang chủ</Link>,
  },
  // {
  //   key: "2",
  //   icon: <UserOutlined />,
  //   label: <Link to={"/users"}>Quản lý tài khoản</Link>,
  // },
];
