import { Table } from "antd";

export default function UsersManage() {
  const dataSource = Array.from({ length: 10 }).map((_, i) => ({
    key: i,
    name: `User ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <div>
      <h1 className="text-center text-2xl font-bold uppercase mb-4">
        Danh sách tài khoản
      </h1>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
      ;
    </div>
  );
}
