import { Button } from "antd";
import ModalLayer from "./modalLayer";

interface ModalProps {
  modalOpen: boolean
  onClose?: () => void
  props: {
    title: string
    message: string
    onClick: () => void
  }
}

const ConfirmModal = ({ modalOpen, onClose, props }: ModalProps) => {
  const { title, message, onClick } = props;

  const _onOk = () => {
    if (onClick) {
      onClick();
    }
    if (onClose) {
      onClose();
    }
  }

  return (
    <ModalLayer modalOpen={modalOpen} onOk={_onOk} onClose={onClose} props={{ width: 400 }}>
      <div className="flex flex-col items-center justify-center pt-[16px] gap-[32px]">
        <h2 className="font-semibold text-[16px] text-center">{title}</h2>
        <p className="text-center">{message}</p>
        <div className="flex items-center justify-end gap-[8px] w-full">
          <Button type="primary" onClick={_onOk}>Yes</Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </ModalLayer>
  );
}

export default ConfirmModal;