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
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const AvatarItems: MenuProps["items"] = [
    {
      key: 1,
      label: <Link to={"/login"}>Đăng xuất</Link>,
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
              link: "/",
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: <Link to={"/users"}>Quản lý tài khoản</Link>,
              link: "/users",
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
            minHeight: 550,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
