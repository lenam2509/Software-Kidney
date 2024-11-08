import { Button } from "antd";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import RegisterModal from "../components/RegisterModal";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const onsubmit = (data: z.infer<typeof LoginSchema>) => {
    Swal.fire({
      title: "Đăng nhập thành công!",
      icon: "success",
    });
    console.log(data);
    navigate("/");
  };

  return (
    <div className="md:flex md:flex-row flex flex-col h-screen">
      <div className="md:w-3/4 w-full bg-slate-200/50">
        <img src="" alt="" />
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
