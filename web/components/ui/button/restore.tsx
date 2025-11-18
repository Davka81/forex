import { Button, Tooltip } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { TbTrashOff } from "react-icons/tb";

const ButtonRestore = ({ size, fnc }: { size?: SizeType, fnc: () => void }) => {
  return (
    <Tooltip title="Restore" placement="bottom">
      <Button
        size={size || "middle"}
        icon={<TbTrashOff className={size === "small" ? "text-[16px]" : "text-[19px]"} />}
        onClick={fnc}
        className="text-white bg-[#11bf76] border-[#11bf76] hover:!text-white hover:!bg-[#11bf76] hover:!border-[#11bf76]"
      />
    </Tooltip>
  )
}

export default ButtonRestore;