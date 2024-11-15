import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Popconfirm, Table, Tag } from "antd";
import AxiosConfig from "../configs/axiosClient";
import Swal from "sweetalert2";
import EditUserModal from "../components/EditUserModal";
import { useState } from "react";

export interface userType {
  id: number;
  email: string;
  role: string;
}

export default function UsersManage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userID, setUserID] = useState<number>();

  const handleOk = () => setIsEditModalOpen(false);
  const handleCancel = () => setIsEditModalOpen(false);

  const fetchUsers = async () => {
    const res = await AxiosConfig.get("/users/getAllUsers");
    return res.data;
  };

  const deleteUser = async (id: number) => {
    const res = await AxiosConfig.delete(`/users/deleteUser/${id}`);
    return res.data;
  };

  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<userType[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    refetchOnWindowFocus: false,
    staleTime: 5000,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      Swal.fire({
        text: data.message,
        icon: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      Swal.fire({
        text: error.message,
        icon: "error",
      });
    },
  });

  const dataSource = data?.map((user) => ({
    ...user,
    key: user.id,
    action: [
      <div key={user.id} className="flex gap-1">
        <Button
          key={user.id}
          type="primary"
          className="bg-blue-500"
          onClick={() => {
            setIsEditModalOpen(true);
            setUserID(user.id);
          }}
        >
          Sửa
        </Button>
        <Popconfirm
          title="Xóa user"
          description="Bạn có muốn xóa user này ?"
          onConfirm={() => {
            deleteMutation.mutate(user.id);
          }}
          onCancel={() => {}}
          okText="Có"
          cancelText="Không"
        >
          <Button type="primary" className="bg-red-500">
            Xóa
          </Button>
        </Popconfirm>
      </div>,
    ],
  }));

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (_: string, record: userType) => (
        <Tag color={record.role === "admin" ? "red" : "green"}>
          {record.role}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
    },
  ];
  return (
    <div>
      <h1 className="text-center text-2xl font-bold uppercase mb-4">
        Danh sách tài khoản
      </h1>
      {error && (
        <div>
          <p>{error.message}</p>
        </div>
      )}
      <EditUserModal
        isEditModalOpen={isEditModalOpen}
        id={userID}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        loading={isLoading}
        bordered
        scroll={{ x: "max-content" }}
      />
      ;
    </div>
  );
}
