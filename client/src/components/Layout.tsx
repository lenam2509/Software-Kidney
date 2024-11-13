import React, { useState } from "react";
import {
  HomeFilled,
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
import { Link, Outlet, useNavigate } from "react-router-dom";
import AxiosConfig from "../configs/axiosClient";
import Swal from "sweetalert2";

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const logout = () => {
    AxiosConfig.get("/auth/logout")
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
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
      label: <span onClick={logout}>Đăng xuất</span>,
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          items={[
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
          ]}
        />
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
              user1@gmail.com
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
