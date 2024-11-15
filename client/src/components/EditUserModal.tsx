import { Modal } from "antd";

interface EditUserModalProps {
  id?: number;
  isEditModalOpen: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
}

export default function EditUserModal({
  id,
  isEditModalOpen,
  handleOk,
  handleCancel,
}: EditUserModalProps) {
  return (
    <Modal
      key={id}
      title={"Sửa vai trò của user id: " + id}
      open={isEditModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      EditUserModal
    </Modal>
  );
}
