import React, { useState } from "react";
import { Button, Modal } from "antd";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";

const RegisterSchema = z.object({
  remail: z.string().email({ message: "email không hợp lệ" }),
  rpassword: z
    .string()
    .min(6, { message: "phải trên 6 ký tự" })
    .max(20, { message: "phải dưới 20 chữ số" }),
});

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

const RegisterModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    reset();
    setIsModalOpen(false);
  };

  const onRegister = (data: RegisterSchemaType) => {
    Swal.fire({
      title: "Đăng ký thành công!",
      icon: "success",
    });
    reset();
    setIsModalOpen(false);
    console.log(data);
  };

  return (
    <>
      <span
        className="text-blue-400 underline cursor-pointer  "
        onClick={showModal}
      >
        Chưa có tài khoản?
      </span>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="cancel"
            color="danger"
            // loading={loading}
            onClick={handleCancel}
          >
            Cancel
          </Button>,
        ]}
      >
        <h1 className="text-center text-2xl font-bold">Đăng ký tài khoản</h1>
        <form
          onSubmit={handleSubmit(onRegister)}
          className="flex flex-col gap-4  p-4"
        >
          <input
            {...register("remail")}
            type="text"
            placeholder="email"
            className="p-2 rounded-lg ring-2"
          />
          {errors.remail && (
            <span className="text-red-500">{errors.remail.message}</span>
          )}
          <input
            {...register("rpassword")}
            type="password"
            placeholder="mật khẩu"
            className="p-2 rounded-lg ring-2"
          />
          {errors.rpassword && (
            <span className="text-red-500">{errors.rpassword.message}</span>
          )}
          <Button htmlType="submit" type="primary">
            Đăng Ký
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default RegisterModal;
