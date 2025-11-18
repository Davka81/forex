import { Button } from "antd";
import { ReactNode } from "react";
import { RxReload } from "react-icons/rx";

type IButtonRefresh = {
  fnc: () => void
  children: ReactNode
}

const ButtonRefresh = ({ fnc = () => { }, children }: IButtonRefresh) => {
  return (
    <Button type="default" icon={<RxReload className="text-[17px]" />} onClick={fnc} className="flex items-center py-0 px-[8px]">{children}</Button>
  )
}

export default ButtonRefresh;