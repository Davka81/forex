import { Button } from "antd";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      className="flex items-center justify-center bg-white font-medium text-[14px] text-[#3c4043] rounded gap-3 border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md transition-all h-[44px] w-full"
      onClick={onClick}
    >
      <FcGoogle size={20} />
      <span>Google Login</span>
    </Button>
  )
}

export default GoogleButton;