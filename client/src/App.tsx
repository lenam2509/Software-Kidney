import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AppLayout from "./components/Layout";
import UsersManage from "./pages/UsersManage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<UsersManage />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
