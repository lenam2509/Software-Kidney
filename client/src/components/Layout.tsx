import React, { useEffect, useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  theme,
  Typography,
} from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import AxiosConfig from "../configs/axiosClient";
import Swal from "sweetalert2";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/reducers/authSlice";
import { adminLinks, userLinks } from "../varibles/links";

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const Logout = () => {
    AxiosConfig.get("/auth/logout")
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          dispatch(logout());
          navigate("/login");
          return Swal.fire({
            text: res.data.message,
            icon: "success",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const AvatarItems: MenuProps["items"] = [
    {
      key: 1,
      label: <span onClick={Logout}>Đăng xuất</span>,
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  let itemsLinks;
  if (user.role == "user") {
    itemsLinks = userLinks;
  }
  if (user.role == "admin") {
    itemsLinks = adminLinks;
  }

  useEffect(() => {
    if (!isAuth || !localStorage.getItem("persist:auth")) {
      Swal.fire({
        text: "bạn cần đăng nhập",
        icon: "error",
      });
      return navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" items={itemsLinks} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Typography.Text type="success" strong={true}>
              {user.email}
            </Typography.Text>
            <Dropdown menu={{ items: AvatarItems }}>
              <Avatar
                style={{ marginRight: "10px", cursor: "pointer" }}
                icon={<UserOutlined />}
              />
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,

            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="h-full min-h-screen"
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
