import { Button, Input } from "antd";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";

const ButtonSearch = () => {
	const [click, setClick] = useState<boolean>(false);
	return (
		<>
			{click ? <Input placeholder="Search" prefix={<IoSearchOutline />} /> : <Button onClick={() => { setClick(true) }} className="bg-white p-[8px] rounded w-8 h-8"><FiSearch /></Button>}
		</>
	)
}

export default ButtonSearch;