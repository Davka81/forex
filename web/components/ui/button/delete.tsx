import { Button, Tooltip } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { TfiTrash } from "react-icons/tfi";

const ButtonDelete = ({ size, fnc }: { size?: SizeType, fnc: () => void }) => {
  return (
    <Tooltip title="Delete" placement="bottom">
      <Button
        size={size || "middle"}
        icon={<TfiTrash className={size === "small" ? "text-[16px]" : "text-[19px]"} />}
        onClick={fnc}
        className="text-white bg-[#fc4b6c] border-[#fc4b6c] hover:!text-white hover:!bg-[#fc6682] hover:!border-[#fc5d7b]"
      />
    </Tooltip>
  )
}

export default ButtonDelete;