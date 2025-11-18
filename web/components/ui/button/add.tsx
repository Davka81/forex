import { Button } from "antd";
import { ReactNode } from "react";
import { MdAdd } from "react-icons/md";

const ButtonPlus = ({ disabled, fnc = () => { }, children }: { disabled: boolean, fnc: () => void, children: ReactNode }) => {
  return (
    <Button
      disabled={disabled}
      type="primary"
      icon={<div className="flex items-center justify-center"><MdAdd className="text-[18px]" /></div>}
      onClick={fnc}
      className="flex items-center py-0 px-[8px] pr-[14px]"
    >
      {children}
    </Button>
  )
}

export default ButtonPlus;