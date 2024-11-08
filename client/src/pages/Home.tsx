import { Table } from "antd";

export default function Home() {
  const dataSource = Array.from({ length: 5 }).map((_, i) => ({
    key: i,
    name: `Edward King ${i}`,
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
        Danh sách bệnh nhân của ngày hôm nay
      </h1>
      <Table dataSource={dataSource} columns={columns} pagination={false} />;
    </div>
  );
}
