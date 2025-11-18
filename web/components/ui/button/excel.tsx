import { Button } from "antd";
import { ReactNode } from "react";
import { FaFileExcel } from "react-icons/fa";

const ButtonExcel = ({ disabled, loading, fnc, children }: { disabled: boolean, loading: boolean, fnc: () => void, children: ReactNode }) => {
  return (
    <Button
      disabled={disabled}
      loading={loading}
      type="primary"
      icon={<FaFileExcel className="flex items-center justify-center text-[18px]" />}
      onClick={fnc}
      className="flex items-center py-0 px-[8px] pr-[14px]"
    >
      {children}
    </Button>
  )
}

export default ButtonExcel;