import { Button, Tooltip } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { TfiPencil } from "react-icons/tfi";

const ButtonEdit = ({ size = "middle", fnc }: { size?: SizeType, fnc: () => void }) => {
  return (
    <Tooltip title="Edit" placement="bottom">
      <Button
        size={size || "middle"}
        icon={<TfiPencil className={size === "small" ? "text-[16px]" : "text-[19px]"} />}
        onClick={fnc}
        className="text-white bg-[#21c1d6] border-[#21c1d6] hover:!text-white hover:!bg-[#42cadc] hover:!border-[#37c7da]"
      />
    </Tooltip>
  )
}

export default ButtonEdit;