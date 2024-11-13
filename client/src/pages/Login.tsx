import { Button } from "antd";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import RegisterModal from "../components/RegisterModal";
import AxiosConfig from "../configs/axiosClient";

import { login } from "../redux/reducers/authSlice";
import { useAppDispatch } from "../redux/hooks";

const LoginSchema = z.object({
  email: z.string().email({ message: "email không hợp lệ" }),
  password: z
    .string()
    .min(6, { message: "phải trên 6 ký tự" })
    .max(20, { message: "phải dưới 20 chữ số" }),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const onsubmit = (data: z.infer<typeof LoginSchema>) => {
    AxiosConfig.post("/auth/login", {
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          dispatch(login(res.data));
          navigate("/");
          return Swal.fire({
            text: res.data.message,
            icon: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 400) {
          return Swal.fire({
            text: err.response.data.message,
            icon: "error",
          });
        }
        return Swal.fire({
          text: "có lỗi xảy ra",
          icon: "error",
        });
      });
  };

  return (
    <div className="md:flex md:flex-row flex flex-col h-screen">
      <div className="md:w-3/4 w-full bg-slate-200/50  border-r border-r-blue-300">
        <img
          src="https://www.benhviennhabe.vn/vnt_upload/weblink/72bc2d3a1107d0598916_1.jpg"
          alt=""
          className="w-full h-full"
        />
      </div>

      <div className="md:w-2/6 p-4 w-full ">
        <h1 className="text-center font-bold mb-4 text-2xl">
          ĐĂNG NHẬP TÀI KHOẢN
        </h1>
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col gap-4 mb-2
        "
        >
          <input
            {...register("email")}
            type="text"
            placeholder="email"
            className="ring-1 p-2 rounded-lg"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          <input
            {...register("password")}
            type="password"
            placeholder="mật khẩu"
            className="ring-1 p-2 rounded-lg"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
          <Button type="primary" htmlType="submit">
            ĐĂNG NHẬP
          </Button>
        </form>
        <RegisterModal />
      </div>
    </div>
  );
}
