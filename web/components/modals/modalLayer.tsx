import { Modal, ModalProps } from "antd";
import React from "react";
import { FiX } from "react-icons/fi";

interface ModalLayerProps {
  modalOpen: boolean;
  onClose?: () => void;
  onOk?: () => void;
  children: React.ReactNode;
  noPadding?: boolean;
  closeBtn?: boolean
  props?: ModalProps
}

const ModalLayer = ({ modalOpen, onClose, onOk, noPadding = false, closeBtn = true, props, children }: ModalLayerProps) => {
  return (
    <Modal open={modalOpen} centered onOk={onOk} closable={false} footer={null} onCancel={onClose} className={noPadding ? "ant-modal-content-no-padding" : ""} {...props} >
      {closeBtn ?
        <div onClick={onClose} className="flex items-center justify-center bg-[#E3E2E0]/[0.5] text-[#37352f]/[0.45] text-[12px] cursor-pointer absolute top-[10px] right-[10px] w-[18px] h-[18px] rounded-[50%] transition-colors duration-[20ms] ease-in hover:bg-[#E3E2E0]">
          <FiX />
        </div>
        :
        <></>
      }
      {children}
    </Modal>
  );
}

export default ModalLayer;